import { type ActionFunctionArgs, json } from "@remix-run/cloudflare";
import {
  getBlogList,
  getBlogContent,
  BlogListItem,
  setBlogListKV,
} from "~/service/blogs";

export async function action({ request, context }: ActionFunctionArgs) {
  if (request.method.toLowerCase() !== "post") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const result: BlogListItem[] = [];

  const blogs = await getBlogList("article/blogs");

  for (const blog of blogs.items) {
    const langList = await getBlogList(`article/blogs/${blog.name}`);
    for (const lang of langList.items) {
      const content = await getBlogContent(
        `blogs/${blog.name}`,
        lang.name.replace(".md", "")
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

  try {
    await setBlogListKV(context.cloudflare.env, result);
    return json({ success: true });
  } catch (e) {
    return json(e);
  }
}
