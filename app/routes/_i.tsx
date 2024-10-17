import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, redirect } from "@remix-run/react";

import { Header, Footer } from "~/components";

import { defaultLocale, locales } from "~/i18n";
import { loader as rootLoader } from "~/root";

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

  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isError404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="h-screen flex flex-col">
      <Header className="h-20" navLinks={headerLinks} />
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
      <Footer navLinks={footerLinks} />
    </div>
  );
}

export default function Layout() {
  return (
    <div>
      <Header className="h-20" navLinks={headerLinks} />
      <main>{<Outlet />}</main>
      <Footer navLinks={footerLinks} />
    </div>
  );
}

const headerLinks = [
  { path: "/", label: "Home" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" },
];

const footerLinks = [
  { path: "/", label: "Home" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" },
];
