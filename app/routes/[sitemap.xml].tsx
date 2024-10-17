import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { locales, defaultLocale } from "~/i18n";

const sitemaps = [
  {
    path: "/",
    withI18N: true,
    lastmod: new Date().toISOString(),
    priority: "1.0",
  },
  {
    path: "/privacy-policy",
    withI18N: false,
    lastmod: new Date("2024-10-15").toISOString(),
    priority: "0.9",
  },
  {
    path: "/terms-of-service",
    withI18N: false,
    lastmod: new Date("2024-10-15").toISOString(),
    priority: "0.9",
  },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const sitemapList = [] as {
    loc: String;
    lastmod: String;
    priority: String;
  }[];

  sitemaps.forEach((site) => {
    const pathname = site.path.startsWith("/") ? site.path.slice(1) : site.path;

    if (site.withI18N) {
      locales.forEach((locale) => {
        const loc = [url.origin];

        if (locale !== defaultLocale) loc.push(locale);

        if (pathname) loc.push(pathname);

        sitemapList.push({
          loc: loc.join("/"),
          lastmod: site.lastmod,
          priority: site.priority,
        });
      });
    } else {
      sitemapList.push({
        loc: pathname ? [url.origin, pathname].join("/") : url.origin,
        lastmod: site.lastmod,
        priority: site.priority,
      });
    }
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
