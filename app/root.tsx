import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { defaultLocale, locales } from "~/i18n";

import "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params?.lang ?? defaultLocale;

  return { lang: locales.includes(lang) ? lang : defaultLocale };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<typeof loader>();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          data-domain="miraibogo.org"
          src="https://app.pageview.app/js/script.js"
        />

        <Meta />
        <Links />
      </head>
      <body>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RES1ZNZJJ6"
        />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date())
              gtag('config', 'G-RES1ZNZJJ6', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
