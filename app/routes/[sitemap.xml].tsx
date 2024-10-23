import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { locales, defaultLocale } from "~/i18n";

import { getBlogListKV } from "~/service/blogs";

const sitemaps = [
  {
    path: "/",
    priority: "1.0",
  },
  {
    path: "/privacy-policy",
    priority: "0.9",
  },
  {
    path: "/terms-of-service",
    priority: "0.9",
  },
  {
    path: "/about",
    priority: "0.9",
  },
  {
    path: "/contact",
    priority: "0.9",
  },
  {
    path: "/blogs",
    priority: "0.9",
  },
];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const blogList = await getBlogListKV(context.cloudflare.env);

  const sitemapList = [] as {
    loc: String;
    lastmod: String;
    priority: String;
  }[];

  sitemaps.forEach((site) => {
    const pathname = site.path.startsWith("/") ? site.path.slice(1) : site.path;

    locales.forEach((locale) => {
      const loc = [url.origin];

      if (locale !== defaultLocale) loc.push(locale);

      if (pathname) loc.push(pathname);

      sitemapList.push({
        loc: loc.join("/"),
        lastmod: new Date().toISOString(),
        priority: site.priority,
      });
    });
  });

  blogList.forEach((blog) => {
    const loc = [url.origin];
    const lang = blog.lang.replace(".md", "");
    if (lang !== defaultLocale) loc.push(lang);
    loc.push("blogs", blog.slug);

    sitemapList.push({
      loc: loc.join("/"),
      lastmod: new Date(blog.createdAt).toISOString(),
      priority: "0.8",
    });
  });

  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapList
          .map((site) => {
            return `
            <url>
              <loc>${site.loc}</loc>
              <lastmod>${site.lastmod}</lastmod>
              <priority>${site.priority}</priority>
            </url>
          `;
          })
          .join("\n")}
      </urlset>
      `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
