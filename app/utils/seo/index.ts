import type { MetaDescriptor } from "@remix-run/cloudflare";
import { locales, defaultLocale } from "~/i18n";

export const createCanonical = (url: URL, onlyDefaultLocale: boolean) => {
  const languageList: MetaDescriptor[] = [];

  locales.forEach((locale) => {
    const href = [url.origin];
    const pathname = url.pathname.split("/").slice(2).join("/");

    if (onlyDefaultLocale && locale !== defaultLocale) return;
    if (locale !== defaultLocale) href.push(locale);
    if (pathname) href.push(pathname);

    languageList.push({
      tagName: "link",
      rel: "canonical",
      href: href.join("/"),
      hrefLang: locale,
    });
  });

  return languageList;
};

export const createAlternate = (
  url: URL,
  locale: string,
  pathname: string
): MetaDescriptor => {
  const href = [url.origin];
  if (locale !== defaultLocale) href.push(locale);
  if (pathname) href.push(pathname);

  return {
    tagName: "link",
    rel: "alternate",
    href: href.join("/"),
  };
};

export const createSeoMetas = (
  url: URL,
  onlyDefaultLocale?: boolean,
  locale?: string,
  pathname?: string
) => {
  const path = pathname
    ? pathname.startsWith("/")
      ? pathname.slice(1)
      : pathname
    : url.pathname.split("/").slice(2).join("/");

  const language = createCanonical(url, onlyDefaultLocale ?? false);
  const canonical = createAlternate(
    url,
    onlyDefaultLocale ? defaultLocale : locale ?? defaultLocale,
    path
  );

  return language.concat(canonical);
};
