import { useRouteLoaderData } from "@remix-run/react";
import type { loader } from "~/root";
import { defaultLocale } from "~/i18n";

export const useLocale = () => {
  const data = useRouteLoaderData<typeof loader>("root");
  return data?.lang ?? defaultLocale;
};
