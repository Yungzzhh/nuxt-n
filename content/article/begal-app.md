---
title: 'Begal App'
description: 'A project about meal planning' 
time: '2023-10-01'
tag: '#Flutter'
--- 

## 项目背景

每天都带饭，做个菜谱用于记录和提醒

## 前端

**Flutter** 和 **Figma**

## 数据库

第一阶段 创建最基础的数据结构包含 **增删查改** 和 **数据库表**

```sql
-- 创建烹饪方法表
CREATE TABLE cooking_methods (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

-- 创建肉类类型表
CREATE TABLE meat_types (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

-- 创建菜品表
CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- 创建菜品-烹饪方法关联表
CREATE TABLE dish_cooking_methods (
    dish_id INTEGER REFERENCES dishes(id),
    cooking_method_code TEXT REFERENCES cooking_methods(code),
    PRIMARY KEY (dish_id, cooking_method_code)
);

-- 创建菜品-肉类类型关联表
CREATE TABLE dish_meat_types (
    dish_id INTEGER REFERENCES dishes(id),
    meat_type_code TEXT REFERENCES meat_types(code),
    PRIMARY KEY (dish_id, meat_type_code)
);

-- 创建膳食计划表
CREATE TABLE meal_plans (
    date DATE,
    time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon')),
    dish_id INTEGER REFERENCES dishes(id),
    PRIMARY KEY (date, time_of_day, dish_id)
);

-- 创建视图：菜品详情（包括烹饪方法和肉类类型）
CREATE VIEW dish_details AS
SELECT 
    d.id,
    d.name,
    d.description,
    array_agg(DISTINCT cm.code) AS cooking_methods,
    array_agg(DISTINCT mt.code) AS meat_types
FROM 
    dishes d
LEFT JOIN 
    dish_cooking_methods dcm ON d.id = dcm.dish_id
LEFT JOIN 
    cooking_methods cm ON dcm.cooking_method_code = cm.code
LEFT JOIN 
    dish_meat_types dmt ON d.id = dmt.dish_id
LEFT JOIN 
    meat_types mt ON dmt.meat_type_code = mt.code
GROUP BY 
    d.id, d.name, d.description;

-- 创建视图：每日膳食计划
CREATE VIEW daily_meal_plan AS
SELECT 
    mp.date,
    mp.time_of_day,
    json_agg(json_build_object(
        'id', d.id,
        'name', d.name,
        'description', d.description
    )) AS dishes
FROM 
    meal_plans mp
JOIN 
    dishes d ON mp.dish_id = d.id
GROUP BY 
    mp.date, mp.time_of_day;

-- 插入烹饪方法
INSERT INTO cooking_methods (code, name) VALUES
('STIR_FRY', '炒'),
('STEAM', '蒸'),
('BRAISE', '焖'),
('FRY', '炸'),
('SALAD', '凉拌'),
('ROAST', '烤')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name;

-- 插入肉类类型
INSERT INTO meat_types (code, name) VALUES
('BEEF', '牛肉'),
('PORK', '猪肉'),
('LAMB', '羊肉'),
('CHICKEN', '鸡肉'),
('SEAFOOD', '海鲜')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name;

```

第二阶段 引入Storage的Bucket**存储图片**

```sql
-- 首先，删除现有的视图
DROP VIEW IF EXISTS daily_meal_plan;
DROP VIEW IF EXISTS dish_details;

-- 修改 dishes 表，添加 image_url 列
ALTER TABLE dishes ADD COLUMN image_url TEXT;

-- 重新创建视图：菜品详情（包括烹饪方法、肉类类型和图片 URL）
CREATE VIEW dish_details AS
SELECT 
    d.id,
    d.name,
    d.description,
    d.image_url,
    array_agg(DISTINCT cm.code) AS cooking_methods,
    array_agg(DISTINCT mt.code) AS meat_types
FROM 
    dishes d
LEFT JOIN 
    dish_cooking_methods dcm ON d.id = dcm.dish_id
LEFT JOIN 
    cooking_methods cm ON dcm.cooking_method_code = cm.code
LEFT JOIN 
    dish_meat_types dmt ON d.id = dmt.dish_id
LEFT JOIN 
    meat_types mt ON dmt.meat_type_code = mt.code
GROUP BY 
    d.id, d.name, d.description, d.image_url;

-- 重新创建视图：每日膳食计划（包括图片 URL）
CREATE VIEW daily_meal_plan AS
SELECT 
    mp.date,
    mp.time_of_day,
    json_agg(json_build_object(
        'id', d.id,
        'name', d.name,
        'description', d.description,
        'image_url', d.image_url
    )) AS dishes
FROM 
    meal_plans mp
JOIN 
    dishes d ON mp.dish_id = d.id
GROUP BY 
    mp.date, mp.time_of_day;
```

另外需要开启Storage的权限

```sql

-- 允许公开读取图片
CREATE POLICY "Allow public read access to dish images"
ON storage.objects FOR SELECT
USING (bucket_id = 'dishes');

-- 允许公开上传图片
CREATE POLICY "Allow public upload of dish images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'dishes');

-- 允许公开更新图片
CREATE POLICY "Allow public update of dish images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'dishes');

-- 允许公开删除图片
CREATE POLICY "Allow public delete of dish images"
ON storage.objects FOR DELETE
USING (bucket_id = 'dishes');

```

## 批量导入面板

## 交互设计

- 输入框 - 生成菜品 - 菜品CRUD
- AI模型选择 - AI prompt
- 一键上传数据
- 生成loading 生成成功、生成失败提示
- 上传loading 上传成功、上传失败提示
-

## 接入AI

- 配置环境
**.env** 中配置好**OPENAI_API_KEY**

```ts
async function genDishes() {
  isLoading.value = true

  try {
    const { data } = await useFetch('/api/chat', {
      method: 'POST',
      body: {
        model: "gpt-4o",
        messages: [
          {
            role: "system", content: `
            生成菜谱,
            {
              "name": "string",
              "description": "string",
              "cookingMethod": [],
              "meatType": []
            }
              
            description为菜品的原材料和调料即可
            cookingMethod as Array, 请从"STIR_FRY" | "STEAM" | "BRAISE" | "FRY" | "SALAD" | "ROAST"中分类, 
            meatType  as Array, 请从"BEEF" | "PORK" | "LAMB" | "CHICKEN" | "SEAFOOD"中自动分类, 
            需要生成多个, 然后组合成一个json数组
            肉类和方式可以是多选
            以上所有参数为必填
            保证响应内容只显示数组，不需要显示其他内容
          ` },
          { role: "user", content: userInput.value }
        ]
      }
    })

    response.value = data.value.choices[0].message.content
    cards.value = JSON.parse(response.value) 
  } catch (error) {
    console.error('Error:', error)
    response.value = `
        An error occurred while fetching the response.
        Try to switch different model
    `
  } finally {
    isLoading.value = false
  }
}
```

### web接入supabase

- 配置环境
**.env** 中配置好**SUPABASE_URL** 和 **SUPABASE_KEY**
在 **nuxt.config.ts** 中配置好

```ts
// 如果不设置好 内置的中间件会重定向到loginpage 相关issue: https://github.com/supabase/supabase/issues/16551
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase'
    ]
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        redirect: false
    },
})
```

```ts
// server/api/**.ts
export default defineEventHandler(async (event: H3Event) => {
  const client: any = await serverSupabaseClient(event)
})
```
