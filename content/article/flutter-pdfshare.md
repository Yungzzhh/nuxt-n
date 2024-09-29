---
title: 'Flutter PDFShare'
description: 'How to share a PDF'
time: '2024-09-20'
tag: '#Flutter'
---

```yaml
dependencies:
  syncfusion_flutter_pdfviewer: ^27.1.48
  path_provider: ^2.1.4
  share_plus: ^10.0.0
  http: ^1.2.2
```

```dart
// 配置对象
class PdfManager {
  Future<File> downloadAndSavePdf(String url, String fileName) async {
    // 使用 getApplicationDocumentsDirectory() 获取文档目录
    final directory = await getApplicationDocumentsDirectory();
    final filePath = '${directory.path}/$fileName';
    final response = await http.get(Uri.parse(url));
    final file = File(filePath);

    await file.writeAsBytes(response.bodyBytes);
    return file;
  }

  Future<void> sharePdf(String filePath) async {
    final result =
        await Share.shareXFiles([XFile(filePath)], text: 'Check out this PDF!');

    if (result.status == ShareResultStatus.success) {
      print('PDF shared successfully');
    } else if (result.status == ShareResultStatus.dismissed) {
      print('Share was dismissed');
    }
  }

  // 下载并分享PDF
  Future<void> downloadAndSharePdf(String url, String fileName) async {
    final file = await downloadAndSavePdf(url, fileName);
    await sharePdf(file.path);
  }

  // 新增：获取所有已下载的PDF文件
  Future<List<File>> getDownloadedPdfs() async {
    final directory = await getApplicationDocumentsDirectory();
    final files = directory.listSync();
    return files
        .whereType<File>()
        .where((file) => file.path.endsWith('.pdf'))
        .toList();
  }

  // 新增：删除PDF文件
  Future<void> deletePdf(String filePath) async {
    final file = File(filePath);
    if (await file.exists()) {
      await file.delete();
      print('PDF deleted: $filePath');
    }
  }
}
```

Ios 需要配置info.plist 修改默认的语言 和访问文档目录

```plist
<dict>
  <key>CFBundleLocalizations</key>
	<array>
		<string>en</string>
		<string>zh-Hans</string>
		<string>zh-Hant</string>
	</array>
	<key>NSDocumentsDirectory</key>
	<string>允许访问文档目录</string>
	<key>com.apple.security.network.client</key>
	<true/>
</dict>
```

Android 需要配置文件

在 android/app/src/main/res 中添加 values-zh-rCN/strings.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">您的应用名称</string>
    <string name="hello_world">你好，世界！</string>
    <string name="share">分享</string>
    <string name="settings">设置</string>
    <string name="about">关于</string>
</resources>
```

在 android/app/src/main/res 中添加 values-zh-rHK/strings.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">您的應用程式名稱</string>
    <string name="hello_world">你好，世界！</string>
    <string name="share">分享</string>
    <string name="settings">設定</string>
    <string name="about">關於</string>
</resources>
```