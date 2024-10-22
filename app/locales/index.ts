import { merge } from "lodash-es";
import { useMemo } from "react";
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
  const defaultMessage = (await import(`./${defaultLocale}/index.ts`))?.default;

  const value = merge({}, defaultMessage, message);

  if (scope && value) {
    let msg = value;
    const scopeKeys = scope.split(".");
    scopeKeys.forEach((key) => (msg = msg?.[key]));

    return msg;
  }

  return value;
};

// 定义一个类型，可以是 LANG 或者 LANG 的任何嵌套属性
type MessageType = LANG | NestedValueType<LANG, keyof LANG>;

// 辅助类型：获取对象指定路径的值类型
type NestedValueType<
  ObjectType,
  Path extends string
> = Path extends keyof ObjectType
  ? ObjectType[Path]
  : Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? NestedValueType<ObjectType[Key], Rest>
    : never
  : never;

// 新增：获取对象所有可能的嵌套路径
type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType & (string | number)]:
        | `${Key}`
        | `${Key}.${NestedKeyOf<ObjectType[Key]>}`;
    }[keyof ObjectType & (string | number)]
  : never;

// 定义 Scope 类型
type Scope<M extends MessageType> = NestedKeyOf<M>;

// 新增：获取指定 scope 下的所有可能 key
type ScopedKeys<
  M extends MessageType,
  S extends Scope<M> | undefined
> = S extends undefined
  ? NestedKeyOf<M>
  : S extends keyof M
  ? NestedKeyOf<M[S]>
  : S extends `${infer Key}.${infer Rest}`
  ? Key extends keyof M
    ? Rest extends NestedKeyOf<M[Key]>
      ? NestedKeyOf<NestedValueType<M[Key], Rest>>
      : never
    : never
  : never;

// 更新 getTranslations 函数的类型
export const getTranslations = <
  M extends MessageType,
  S extends Scope<M> | undefined
>(
  message: M,
  scope?: S
) => {
  return (key: ScopedKeys<M, S>): string => {
    const keys = ((key ?? "") as string).split(".");

    let value: any = message;
    if (scope) {
      const scopeKeys = scope.split(".");
      scopeKeys.forEach((key) => (value = value?.[key]));
    }
    keys.forEach((key) => (value = value?.[key]));

    return value ?? `${scope ? `${scope}.` : ""}${key}`;
  };
};

// 更新 useTranslations 函数的类型
export const useTranslations = <
  M extends MessageType,
  S extends Scope<M> | undefined
>(
  message: M,
  scope?: S
) => {
  const t = useMemo(() => getTranslations(message, scope), [message, scope]);

  return t;
};
