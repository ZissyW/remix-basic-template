import type {
  MetaFunction,
  MetaDescriptor,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";
import { getBlogListKV } from "~/service/blogs";
import { getMessage, getTranslations, getLocale, LANG } from "~/locales";
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

export const loader = async ({
  request,
  context,
  params,
}: LoaderFunctionArgs) => {
  const lang = getLocale(params.lang);
  const seoMetas = createSeoMetas(new URL(request.url), true);

  const blogList = await getBlogListKV(context.cloudflare.env);
  const result = blogList
    .filter((item) => {
      const blogLang = item.lang.replace(".md", "");
      return blogLang === lang;
    })
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

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

  return (
    <div>
      <HeroSection className="container pt-24 md:pt-32" {...content.hero} />
      <ArticleListSection
        className="container py-4 md:py-8"
        list={list.map((item) => ({
          title: item.title,
          description: item.description,
          path: item.slug,
          createdAt: item.createdAt,
          cover: item.cover,
        }))}
      />
    </div>
  );
}
