import { type ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { getBlogList, getBlogContent } from "~/service/blogs";

interface ResultItem {
  cover: string;
  lang: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
}
export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toLowerCase() !== "post") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const result: ResultItem[] = [];

  const blogs = await getBlogList("article/blogs");

  for (const blog of blogs.items) {
    const langList = await getBlogList(`article/blogs/${blog.name}`);
    for (const lang of langList.items) {
      const content = await getBlogContent(
        `blogs/${blog.name}`,
        lang.name
      ).catch(() => null);
      if (!content) continue;

      result.push({
        title: content.attributes.title as string,
        description: content.attributes.description as string,
        cover: content.attributes.cover as string,
        createdAt: content.attributes.createdAt as string,
        lang: lang.name,
        slug: blog.name,
      });
    }
  }

  return json(result);
}
