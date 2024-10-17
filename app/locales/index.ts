import { merge } from "lodash-es";
import { useCallback } from "react";
import { defaultLocale } from "~/i18n";
import defaultLang from "./en";

export type LANG = typeof defaultLang;

export const getMessage = async <T = any>(
  lang?: string,
  scope?: string
): Promise<T> => {
  let message = undefined;
  if (lang) {
    try {
      message = (await import(`./${lang}/index.ts`))?.default;
    } catch {}
  }
  const defaultMessage = defaultLang;

  const value = merge({}, defaultMessage, message);

  if (scope && value) {
    let msg = value;
    const scopeKeys = scope.split(".");
    scopeKeys.forEach((key) => (msg = msg?.[key]));

    return msg;
  }

  return value;
};

export const getTranslations = async (lang?: string, scope?: string) => {
  const message = await getMessage(lang ?? defaultLocale);

  return (key: string): string => {
    const keys = key.split(".");

    let value = message;
    if (scope) {
      const scopeKeys = scope.split(".");
      scopeKeys.forEach((key) => (value = value?.[key]));
    }
    keys.forEach((key) => (value = value[key]));

    return value ?? `${scope ? `${scope}.` : ""}${key}`;
  };
};

export const useTranslations = (message: any, scope?: string) => {
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");

      let value = message;
      if (scope) {
        const scopeKeys = scope.split(".");
        scopeKeys.forEach((key) => (value = value?.[key]));
      }
      keys.forEach((key) => (value = value?.[key]));

      return value ?? `${scope ? `${scope}.` : ""}${key}`;
    },
    [scope, message]
  );

  return t;
};
