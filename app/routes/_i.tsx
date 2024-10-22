import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, redirect } from "@remix-run/react";

import { Header, Footer } from "~/components";

import { defaultLocale, locales, Link } from "~/i18n";
import { getMessage } from "~/locales";

import { createLayoutContent } from "~/content/layout";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = params?.lang;

  if (lang && lang === defaultLocale) {
    const url = new URL(request.url);
    const pathname = url.pathname.split("/").slice(2).join("/");
    return redirect(`/${pathname}`, 301);
  }

  if (lang && !locales.includes(lang)) {
    const url = new URL(request.url);

    let isArticle = false;
    if (url.pathname.startsWith("/blogs")) {
      const articlePath = url.pathname.split("/")[2];

      if (
        !!articlePath &&
        !["about", "contact", "privacy-policy", "terms-of-service"].includes(
          articlePath
        )
      ) {
        isArticle = true;
      }
    }

    if (!isArticle) {
      throw new Response(null, {
        status: 404,
        statusText: "Not Found",
      });
    }
  }

  const messages = await getMessage(lang);
  const content = createLayoutContent(messages);

  return { content };
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isError404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      {isError404 && (
        <main className="flex-1 min-h-0 pt-20 flex flex-col justify-center">
          <div className="container mx-auto">
            <div className="max-w-sm w-full">
              <p className="uppercase text-xl text-white font-medium">
                Error 404
              </p>
              <h1 className="text-3xl font-bold text-white mt-2 mb-4">
                Page Not Found
              </h1>
              <p className="text-base text-zinc-400">
                The Page you're trying to access doesn't exist or has beef
                removed.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  reloadDocument
                  className="h-10 inline-flex items-center px-6 rounded bg-[#2a5fb8] text-white"
                >
                  Go Back Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();
  const { content } = loaderData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="h-20" {...content.header} />
      <main className="flex-1">{<Outlet />}</main>
      <Footer {...content.footer} />
    </div>
  );
}
