import type {
  MetaFunction,
  MetaDescriptor,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";
import { getBlogList } from "~/service/blogs";
import { getMessage, getTranslations, LANG } from "~/locales";
import { createBlogsContent } from "~/content/blogs";

import { HeroSection, ArticleListSection } from "~/components/blogs";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const meta: MetaDescriptor[] = [
    { title: data.meta.title },
    {
      name: "description",
      content: data.meta.description,
    },
    {
      property: "og:title",
      content: data.meta.ogTitle,
    },
    { property: "og:site_name", content: data.meta.ogSiteName },
    {
      property: "og:description",
      content: data.meta.ogDescription,
    },
  ];

  meta.push(...data.seoMetas);

  return meta;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const seoMetas = createSeoMetas(new URL(request.url), true);

  const result = await getBlogList("article/blogs");

  if (!result) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const message = await getMessage<LANG["blogs"]>(params.lang, "blogs");
  const t = getTranslations(message, "meta");
  const content = createBlogsContent(message);

  const meta = {
    title: t("title"),
    description: t("description"),
    ogTitle: t("og:title"),
    ogSiteName: t("og:site_name"),
    ogDescription: t("og:description"),
  };

  return { meta, seoMetas, list: result, content };
};

export default function Page() {
  const { list, content } = useLoaderData<typeof loader>();

  console.log("list", list);
  return (
    <div>
      <HeroSection className="container pt-24 md:pt-32" {...content.hero} />
      <ArticleListSection
        className="container py-4 md:py-8"
        list={list.items.map((item) => ({
          title: "Test title",
          description: item.name,
          path: item.name,
          createdAt: "2024-10-10",
        }))}
      />
    </div>
  );
}
