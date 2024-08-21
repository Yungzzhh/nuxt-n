---
title: 'Flutter local notification'
description: '在app中实现定时推送' 
time: '2024-08-20 10:00 AM'
---

## 前置工作

```pubspec.yaml
dependencies:
  shared_preferences: ^2.3.2
  flutter_local_notifications: ^17.2.2
  timezone: ^0.9.4
```

```bash
flutter pub add flutter_local_notifications
```

```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter
import flutter_local_notifications

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // This is required to make any communication available in the action isolate.
    FlutterLocalNotificationsPlugin.setPluginRegistrantCallback { (registry) in
        GeneratedPluginRegistrant.register(with: registry)
    }

    // 请求通知权限
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
      if granted {
        print("Notification permission granted")
      } else {
        print("Notification permission denied")
      }
    }    

    // 兼容
    if #available(iOS 10.0, *) {
      UNUserNotificationCenter.current().delegate = self as UNUserNotificationCenterDelegate
    }

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

```plist
// ios/Runner/Info.plist
<key>UIBackgroundModes</key>
 <array>
   <string>fetch</string>
   <string>remote-notification</string>
 </array>
 <key>UIUserNotificationSettings</key>
 <array>
   <string>alert</string>
   <string>badge</string>
   <string>sound</string>
 </array>
 <key>NSUserNotificationUsageDescription</key>
 <string>We need to send you notifications about your meal plans.</string>
```

## 构造基本的本地通知类并初始化

如果有出现 **DarwinInitializationSettings** 提示不存在这个类，建议Reload，然后重新运行项目
先构造基本的本地通知类

```dart
// lib/utils/notification_service.dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
class NotificationService {
  static final NotificationService _notificationService =
      NotificationService._internal();
  factory NotificationService() {
    return _notificationService;
  }
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<void> init() async {
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings initializationSettingsDarwin =
        DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );

    const InitializationSettings initializationSettings =
        InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsDarwin,
      macOS: initializationSettingsDarwin,
    );

    await flutterLocalNotificationsPlugin.initialize(
      initializationSettings,
      onDidReceiveNotificationResponse:
          (NotificationResponse notificationResponse) {
        // 处理通知响应
      },
    );
  }

  Future<void> showNotification({
    required int id,
    required String title,
    required String body,
  }) async { 
    await flutterLocalNotificationsPlugin.show(
      id,
      title,
      body,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'your_channel_id',
          'your_channel_name',
          channelDescription: 'your_channel_description',
          importance: Importance.max,
          priority: Priority.high,
        ),
        iOS: DarwinNotificationDetails(),
      ),
    );
  }
}
```

在main.dart中初始化

```dart
// main.dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NotificationService().init();
  runApp(const MyApp());
}
```

正常使用

```dart
NotificationService().showNotification(
  id: 1,
  title: '今日菜单',
  body: '今日菜单',
);
```

## 引入定时通知功能

可在 **_getMealPlanNotificationBody** 中自定义设置通知内容 如果是需要请求获取的 可以在这里请求 当请求成功后 再调用showNotification 若请求失败，则通知默认模板内容

```dart
// lib/utils/notification_service.dart
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;
// 在class NotificationService中添加

Future<void> scheduleNotification({
    required int id,
    required String title,
    required String body,
    required TimeOfDay scheduledTime,
  }) async {
    tz.initializeTimeZones();
    tz.setLocalLocation(tz.getLocation('Asia/Shanghai'));
    final now = tz.TZDateTime.now(tz.local);
    var scheduledDate = tz.TZDateTime(
      tz.local,
      now.year,
      now.month,
      now.day,
      scheduledTime.hour,
      scheduledTime.minute,
    );

    // 如果时间已经过去，安排在明天的这个时间
    if (scheduledDate.isBefore(now)) {
      scheduledDate = scheduledDate.add(const Duration(days: 1));
    }

    final body = await _getMealPlanNotificationBody(scheduledDate); // ❗️
    logger.d(now);
    logger.d(scheduledDate);

    await flutterLocalNotificationsPlugin.zonedSchedule(
      id,
      title,
      body,
      scheduledDate,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'your_channel_id',
          'your_channel_name',
          channelDescription: 'your_channel_description',
        ),
        iOS: DarwinNotificationDetails(),
      ),
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
      matchDateTimeComponents: DateTimeComponents.time,
    );
  }
```

## 针对定时请求通知功能的优化

```dart
// lib/utils/notification_service.dart
// 在class NotificationService中添加
// 首先检查缓存中是否有所需的菜单数据，如果没有才进行 API 调用。
  Future<Map<String, List<Map<String, dynamic>>>> _getCachedMealPlan(
      tz.TZDateTime date) async {
    final dateString = date.toIso8601String().split('T')[0];
    final now = tz.TZDateTime.now(tz.local);

    if (_mealPlanCache.containsKey(dateString)) {
      final cachedPlan = _mealPlanCache[dateString]!;
      if (now.isBefore(cachedPlan.expirationTime)) {
        return cachedPlan.mealPlan;
      } else {
        _mealPlanCache.remove(dateString); // 移除过期的缓存
      }
    }

    final newMealPlan = await _fetchMealPlanWithTimeout(date);
    _mealPlanCache[dateString] = _CachedMealPlan(
      mealPlan: newMealPlan,
      expirationTime: now.add(_cacheDuration),
    );
    return newMealPlan;
  }

  // 使用 Future.any 来设置 5 秒的超时。如果 API 调用在 5 秒内没有完成，就会抛出一个 TimeoutException
  Future<Map<String, List<Map<String, dynamic>>>> _fetchMealPlanWithTimeout(
      tz.TZDateTime date) async {
    try {
      return await Future.any([
        getDailyMealPlan(date),
        Future.delayed(const Duration(seconds: 5),
            () => throw TimeoutException('Request timed out')),
      ]);
    } catch (e) {
      logger.e('Failed to fetch meal plan: $e');
      return {'lunch': [], 'dinner': []};
    }
  }

  Future<void> cancelNotification(int id) async {
    await flutterLocalNotificationsPlugin.cancel(id);
  }

  // 清除所有缓存
  void clearCache() {
    _mealPlanCache.clear();
    logger.d('Meal plan cache cleared');
  }

  // 清除特定日期的缓存
  void clearCacheForDate(DateTime date) {
    final dateString = date.toIso8601String().split('T')[0];
    _mealPlanCache.remove(dateString);
    logger.d('Meal plan cache cleared for date: $dateString');
  }

  // 清除过期的缓存
  void clearExpiredCache() {
    final now = tz.TZDateTime.now(tz.local);
    logger.d('$now, 清理缓存...');
    _mealPlanCache
        .removeWhere((_, cachedPlan) => now.isAfter(cachedPlan.expirationTime));
    logger.d('Expired meal plan cache cleared');
  }

// 在 class NotificationService 外添加
class _CachedMealPlan {
  final Map<String, List<Map<String, dynamic>>> mealPlan;
  final tz.TZDateTime expirationTime;

  _CachedMealPlan({required this.mealPlan, required this.expirationTime});
}
```

## PS

通过定时设置、请求获取、缓存、定时通知，可以实现定时推送通知的功能。
还可以设置多个时间点进行推送
