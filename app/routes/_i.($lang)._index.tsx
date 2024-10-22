import {
  MetaFunction,
  LoaderFunctionArgs,
  MetaDescriptor,
} from "@remix-run/cloudflare";

import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";

import Cover from "~/assets/miraibo-go-cover.webp?url";

import {
  HeroSection,
  PopluarSection,
  WhatAwaitSection,
  CallActionSection,
  FeaturesSection,
  ReviewsSection,
  FAQsSection,
} from "~/components/home";
import { getTranslations, getMessage, type LANG } from "~/locales";

import { createHomeContent } from "~/content/home";

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
    {
      property: "og:image",
      content: Cover,
    },
  ];

  meta.push(...data.seoMetas);

  return meta;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const message = await getMessage<LANG["home"]>(params.lang, "home");
  const t = getTranslations(message, "meta");

  const seoMetas = createSeoMetas(new URL(request.url), false, params.lang);
  const content = createHomeContent(message);

  const meta = {
    title: t("title"),
    description: t("description"),
    ogTitle: t("og:title"),
    ogSiteName: t("og:site_name"),
    ogDescription: t("og:description"),
  };

  return { meta, seoMetas, content };
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  const { content } = loaderData;

  return (
    <div>
      <HeroSection
        className="container relative z-10 pt-24 md:pt-32 pb-4"
        {...content.hero}
      />
      <PopluarSection className="container py-4" {...content.popular} />
      <WhatAwaitSection
        id="what-await"
        className="container max-w-screen-xl py-4 md:py-24"
        {...content.whatAwait}
      />
      <CallActionSection className="min-h-48" {...content.callAction} />
      <FeaturesSection
        className="container py-4 md:py-16"
        {...content.features}
      />
      <FeaturesSection
        className="container py-4 md:py-16"
        {...content.howPlay}
      />
      <CallActionSection
        className="min-h-48 bg-zinc-800"
        {...content.readyPlay}
      />
      <ReviewsSection
        id="reviews"
        className="container py-4 md:py-24"
        {...content.reviews}
      />
      <FAQsSection
        id="faqs"
        className="container py-4 md:py-24"
        {...content.faqs}
      />
    </div>
  );
}
