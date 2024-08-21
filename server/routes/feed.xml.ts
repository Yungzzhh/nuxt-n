import { serverQueryContent } from "#content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  // 查询内容
  const docs = await serverQueryContent(event)
    .only(["title", "description", "time", "_path", "body"])
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();
  // console.log('docs', docs);

  // 过滤博客文章
  const blogPosts = docs.filter((doc) => doc?._path?.includes("/article"));

  const config = useRuntimeConfig();
  const siteUrl = config.public.baseUrl;

  // 创建 RSS feed 实例
  const feed = new RSS({
    title: "Your Blog Title",
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
  });

  // 添加文章到 feed
  for (const doc of blogPosts) {
    const extractedContent = extractContent(doc.body);
    feed.item({
      title: doc.title ?? "-",
      url: `${siteUrl}${doc._path}`,
      date: doc.time,
      description: doc.description,
      custom_elements: [{ "content:encoded": extractedContent }],
    });
  }

  // 生成 RSS XML
  const feedString = feed.xml();

  // 设置响应头
  setResponseHeader(event, "content-type", "text/xml");

  return feedString;
});


function extractContent(
  node: string | any[] | Record<string, any> | null
): string {
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractContent).join("");
  }
  if (typeof node === "object" && node !== null) {
    if (node.type === "text" && typeof node.value === "string") {
      return node.value;
    }
    if (node.tag) {
      const attributes = Object.entries(node.props || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
      const content = Array.isArray(node.children)
        ? extractContent(node.children)
        : "";
      return `<${node.tag}${attributes ? " " + attributes : ""}>${content}</${node.tag}>`;
    }
    if (Array.isArray(node.children)) {
      return extractContent(node.children);
    }
  }
  return "";
}
