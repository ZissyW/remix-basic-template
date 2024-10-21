import type {
  MetaFunction,
  MetaDescriptor,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";
import { getBlogList } from "~/service/blogs";

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

  const result = await getBlogList();

  if (!result) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const meta = {
    title: "Blogs",
    description: "Blogs",
  };

  return { meta, seoMetas, list: result };
};

export default function Page() {
  const { list } = useLoaderData<typeof loader>();

  return (
    <div className="pt-24 md:pt-32">
      <div className="container"></div>
    </div>
  );
}
