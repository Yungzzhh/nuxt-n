--- 
title: Flutter Easy Transition
description: '--' 
time: '2024-8-13'
---

```dart
InkWell(
  child: Hero(
    tag: '', // !!! uniq
    child: Image.network(
      '..'
    );
    transitionOnUserGestures: true, // 可支持滑动返回时同样触发Hero
  ),
  onTap: () {
    Navigator.of(context).push(MaterialPageRoute(
      builder: (context) => OtherPage(),
    ));
  }
);
```

```dart
// OtherPage another router
Inkwell(
  child: Hero(
    tag: '', // !!! the same tag
    child: Image.network(
        '..'
    );
    transitionOnUserGestures: true, // 可支持滑动返回时同样触发Hero
  ), 
  onTap:() {
    Navigator.of(context).pop();
  }
);
```

同样适用于普通的container
