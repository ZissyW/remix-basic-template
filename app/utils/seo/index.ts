import type { MetaDescriptor } from "@remix-run/cloudflare";
import { locales, defaultLocale } from "~/i18n";

export const createLanguages = (url: URL, onlyDefaultLocale: boolean) => {
  const languageList: MetaDescriptor[] = [];

  locales.forEach((locale) => {
    const href = [url.origin];
    const pathname = url.pathname.split("/").slice(2).join("/");

    if (onlyDefaultLocale && locale !== defaultLocale) return;
    if (locale !== defaultLocale) href.push(locale);
    href.push(pathname);

    languageList.push({
      tagName: "link",
      rel: "alternate",
      href: href.join("/"),
      hrefLang: locale,
    });
  });

  return languageList;
};

export const createCanonical = (
  url: URL,
  locale: string,
  pathname: string
): MetaDescriptor => {
  const href = [url.origin];
  if (locale !== defaultLocale) href.push(locale);
  href.push(pathname);

  return {
    tagName: "link",
    rel: "canonical",
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

  const language = createLanguages(url, onlyDefaultLocale ?? false);
  const canonical = createCanonical(
    url,
    onlyDefaultLocale ? defaultLocale : locale ?? defaultLocale,
    path
  );

  return language.concat(canonical);
};
