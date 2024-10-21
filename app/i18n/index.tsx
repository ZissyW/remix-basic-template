import {
  NavLink,
  useRouteLoaderData,
  type NavLinkProps,
} from "@remix-run/react";
import { loader } from "~/root";

export const defaultLocale = "en";
export const locales = ["en"];

export const localeData = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export const useRootLoaderData = () => {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  return loaderData;
};

export interface LinkProps extends NavLinkProps {}
export const Link = ({ lang, to, ...props }: LinkProps) => {
  const loaderData = useRootLoaderData();
  const linkLang = (lang || loaderData?.lang) ?? defaultLocale;

  const toPath =
    linkLang === defaultLocale
      ? to
      : `/${linkLang}${to === "/" ? "" : to.toString()}`;

  return <NavLink {...props} to={toPath} />;
};
