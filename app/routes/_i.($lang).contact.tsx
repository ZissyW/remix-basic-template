import type {
  MetaFunction,
  MetaDescriptor,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";
import { getBlogContent } from "~/service/blogs";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const meta: MetaDescriptor[] = [
    { title: data.meta.title },
    {
      name: "description",
      content: data.meta.description,
    },
  ];

  meta.push(...data.seoMetas);
  return meta;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const seoMetas = createSeoMetas(new URL(request.url), true);
  const result = await getBlogContent("contact", params.lang);

  if (!result) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const meta = {
    title: result.attributes.title,
    description: result.attributes.description,
    createdAt: result.attributes.createdAt as string | undefined,
  };

  return { meta, seoMetas, html: result.html };
};

export default function Page() {
  const { html, meta } = useLoaderData<typeof loader>();
  return (
    <div className="pt-24 md:pt-32">
      <div className="container">
        <article>
          <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
          <p className="text-base text-zinc-600">
            Effective Date:{" "}
            {new Date(meta.createdAt ?? "2024-11-11").toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
          <div
            className="mt-8 max-w-5xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  );
}
