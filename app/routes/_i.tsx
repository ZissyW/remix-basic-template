import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, redirect } from "@remix-run/react";

import { Header, Footer } from "~/components/_i";

import { defaultLocale, locales } from "~/i18n";
import { getMessage, useTranslations } from "~/locales";

import { fetchMDContent } from "~/utils/github";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const lang = params?.lang;

  if (lang && lang === defaultLocale) {
    const url = new URL(request.url);
    const pathname = url.pathname.split("/").slice(2).join("/");
    return redirect(`/${pathname}`, 301);
  }

  if (lang && !locales.includes(lang)) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const messages = await getMessage(lang);

  return { messages };
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isError404 = isRouteErrorResponse(error) && error.status === 404;

  const loaderData = useLoaderData<typeof loader>();
  const t = useTranslations(loaderData.messages);

  const headerNavLinks = headerLinks.map((item) => ({
    path: item.path,
    label: t(`header.nav.${item.key}`),
  }));

  const footerNavLinks = footerLinks.map((item) => ({
    path: item.path,
    label: t(`footer.nav.${item.key}`),
  }));

  return (
    <div className="h-screen flex flex-col">
      <Header className="h-20" navLinks={headerNavLinks} />
      {isError404 && (
        <main className="flex-1 min-h-0 pt-20 flex flex-col justify-center">
          <div className="container mx-auto">
            <div className="max-w-sm w-full">
              <p className="uppercase text-xl text-[#2a5fb8] font-medium">
                Error 404
              </p>
              <h1 className="text-3xl font-bold text-[#2a5fb8] mt-2 mb-4">
                Page Not Found
              </h1>
              <p className="text-base text-zinc-700">
                The Page you're trying to access doesn't exist or has beef
                removed.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="h-10 inline-flex items-center px-6 rounded bg-[#2a5fb8] text-white"
                >
                  Go Back Home
                </a>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer navLinks={footerNavLinks} />
    </div>
  );
}

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();

  const t = useTranslations(loaderData.messages);

  const headerNavLinks = headerLinks.map((item) => ({
    path: item.path,
    label: t(`header.nav.${item.key}`),
  }));

  const footerNavLinks = footerLinks.map((item) => ({
    path: item.path,
    label: t(`footer.nav.${item.key}`),
  }));

  return (
    <div>
      <Header className="h-20" navLinks={headerNavLinks} />
      <main>{<Outlet />}</main>
      <Footer navLinks={footerNavLinks} />
    </div>
  );
}

const headerLinks = [
  { path: "/", key: "home" },
  { path: "/#features", key: "features" },
  { path: "/#review", key: "review" },
  { path: "/#faqs", key: "faqs" },
];
const footerLinks = [
  { path: "/", key: "home" },
  { path: "/privacy-policy", key: "privacy-policy" },
  { path: "/terms-of-service", key: "terms-of-service" },
];
