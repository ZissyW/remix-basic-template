export const loader = () => {
  // handle "GET" request
  // set up our text content that will be returned in the response
  const robotText = `User-Agent:Googlebot
Allow: *
User-agent: GPTBot
Disallow: /
User-Agent:Baiduspider-render
Allow: *
User-Agent:Baiduspider
Allow: *
User-Agent:*Yahoo*
Allow: *
User-Agent:Yahoo
Allow: *
User-Agent:Bingbot
Allow: *
User-Agent:*
Disallow: /

Sitemap: http://miraibogo.org/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
