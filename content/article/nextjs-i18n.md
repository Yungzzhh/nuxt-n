---
title: 'Nextjs-国际化方案'
description: 'A project about nextjs' 
time: '2024-08-30'
tag: '#Nextjs'
--- 

## 国际化方案

采用 **next-international** 进行国际化
为了持久化，将选中的语言放在了 **cookie** 中

- 目录结构

```markdown
  project/
  ├── locales/
  │   ├── messages/
  |       ├── enUS.json // 存放语句位置
  |       ├── zhHK.json
  |       ├── zhCN.json
  |   ├── lang.ts // 集成多语言
  |   ├── client.ts // 客户端逻辑
  |   ├── server.ts // 服务端逻辑
  |—— app/ 
  |   ├── [locale]/ 
  |       ├── page.tsx  // 正常使用
  ├── middleware.ts // 国际化中间件
  └── package.json
```

以下是各个文件的代码

```typescript
// locales/lang.ts
export const LangMap = {
  "en-US": () => import("./messages/enUS"),
  "zh-CN": () => import("./messages/zhCN"),
  "zh-HK": () => import("./messages/zhHK")
} as const;

export const locales = ["en-US", "zh-CN", "zh-HK"];
```

```typescript
// locales/server.ts
import { createI18nServer } from "next-international/server";
import { LangMap } from "./lang";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(LangMap);
```

```typescript
// locales/client.ts
'use client';
import { createI18nClient } from 'next-international/client';
import { LangMap } from './lang';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient(LangMap);
```

```typescript
// /middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { locales } from "./locales/lang";

/**
 * 创建国际化中间件。
 */
export const I18nMiddleware = createI18nMiddleware({
  locales: locales,
  defaultLocale: "zh-HK",
  urlMappingStrategy: "rewrite"
});

/**
 * 中间件的匹配配置。
 */
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"]
};
```

完成配置后，在外层用组件包裹

```tsx
// 先在顶层文件做一层包裹
import { I18nProviderClient } from '@/locales/client'; 
import { getCurrentLocale } from '@/locales/server';

export default function Layout() {
  const locale = getCurrentLocale(); 
  return <I18nProviderClient 
    locale={locale} 
    >{children}</I18nProviderClient>;
}

// 或 
export default function LoginLayout({
  params: { locale },
  children,
} ) {
  return (
    <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
  );
}
```

现在默认是繁体中文，以下代码为使用方式

```tsx
// server render
import { getI18n } from '@/locales/server';
export default async function Home() {
  const t = await getI18n();
  return <div>{t("hello")}</div>;
}
```

```tsx
// client render
import { useI18n } from '@/locales/client';
export default function Home() {
  const t = useI18n();
  return <div>{t("hello")}</div>;
}
```

如果需要修改语种，可以点击按钮进行切换

```tsx
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { useMemo } from "react";

const langItems: {
  key: Lang;
  label: string;
}[] = [
  {
    key: "en-US",
    label: "en-US"
  },
  {
    key: "zh-CN",
    label: "简体中文"
  },
  {
    key: "zh-HK",
    label: "繁體中文"
  }
];

type Lang = "zh-CN" | "zh-HK" | "en-US";

const SelectLang: React.FC = () => {
  const changeLocale = useChangeLocale();
  const locales = useCurrentLocale();
  const handleChange: MenuProps["onClick"] = ({ key }) => {
    changeLocale(key as Lang);
  };
  const label: Lang = useMemo(() => {
    const chosenLang = langItems.find((lang) => lang?.key === locales)!;
    return chosenLang.label as Lang;
  }, [locales]);
  return (
    <div className=" cursor-pointer">
      <GlobalOutlined className=" mr-1 !text-[#2563eb]" />
      <Dropdown
        menu={{
          items: langItems,
          defaultValue: locales,
          onClick: handleChange
        }}
        placement="bottomRight"
      >
        <span style={{ height: 32, lineHeight: "32px" }}>{label}</span>
      </Dropdown>
    </div>
  );
};
export default SelectLang;
```
