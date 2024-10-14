const sitemaps = [
  {
    loc: "https://miraibogo.org",
    lastmod: new Date().toISOString(),
    priority: "1.0",
  },
  {
    loc: "https://miraibogo.org/privacy-policy",
    lastmod: new Date('2024-10-15').toISOString(),
    priority: "0.9",
  },
  {
    loc: "https://miraibogo.org/terms-of-service",
    lastmod: new Date('2024-10-15').toISOString(),
    priority: "0.9",
  },
];

export const loader = () => {
  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps.map(
          (site) => `
            <url>
              <loc>${site.loc}</loc>
              <lastmod>${site.lastmod}</lastmod>
              <priority>${site.priority}</priority>
            </url>
          `
        )}
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
