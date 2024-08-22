---
title: 'Flutter Logo'
description: 'How to set a logo'
time: '2024-08-13'
tag: '#Flutter'
---
 
可以使用 flutter_launcher_icons 插件来简化这个过程：

在 pubspec.yaml 文件中添加依赖：

```dart
yamlCopydev_dependencies:
  flutter_launcher_icons: ^0.13.1
```

在 pubspec.yaml 文件中配置图标：

```yaml
yamlCopyflutter_launcher_icons:
  android: "launcher_icon"
  ios: true
  image_path: "assets/icon/icon.png"
```

运行命令：

```bash
flutter pub get
flutter pub run flutter_launcher_icons
```

这将自动为 Android 和 iOS 生成并设置应用图标。
记得在更改后重新构建你的应用以应用新的图标。
