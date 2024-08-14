---
title: 'Supabase Data Inject'
description: ' ' 
time: '2024-08-14 11:00 AM'
---

作为一个菜品的最小单元

```js
{
  name: '',
  description: '',
  cooking_methods: [],
  meat_types: [],
  image_url: '',
}
```

```js
// cooking_methods 的枚举值
{
  'STIR_FRY': '炒' ,
  'STEAM':'蒸',
  'BRAISE': '焖',
  'FRY': '炸',
  'SALAD': '凉拌',
  'ROAST': '烤'
}
```

```js
// meat_types 的枚举值
{
  'BEEF': '牛肉',
  'PORK': '猪肉',
  'LAMB': '羊肉',
  'CHICKEN': '鸡肉',
  'SEAFOOD': '海鲜'
}
```

name为菜品名称
description为需要准备的材料，使用逗号分隔
cooking_methods 里注入['STIR_FRY','STEAM']
meat_types 里注入 ['BEEF']

请用supabase + nextjs写一段代码需要

通过按钮生成多个菜品，生成的菜品预览使用card 分割，并给name和description已注入内容的输入框便于二次编辑

通过按钮发起请求并向supabase中注入数据

name是否需要唯一？
