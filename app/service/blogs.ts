import { fetchRepoContents, fetchMDContent } from "~/utils/github";
import { defaultLocale } from "~/i18n";
import { getLocale } from "~/locales";
import { type FetchMarkdownFileResponse } from "~/utils/github";

export interface BlogListItem {
  cover: string;
  lang: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
}

export const getBlogListKV = async (env: Env) => {
  const host = new URL(env.DOMAIN).hostname;
  const result = await env.KV.get(`${host}/blogs`);
  let value: BlogListItem[] = [];
  try {
    value = JSON.parse(result ?? "");
  } catch {
    value = [];
  }

  return value;
};

export const setBlogListKV = async (env: Env, value: BlogListItem[]) => {
  const host = new URL(env.DOMAIN).hostname;
  await env.KV.put(`${host}/blogs`, JSON.stringify(value));
};

export const getBlogItemKV = async (env: Env, slug: string, lang?: string) => {
  const itemLang = getLocale(lang);

  const host = new URL(env.DOMAIN).hostname;
  const result = await env.KV.get(`${host}/blogs/${slug}/${itemLang}`);
  return result ? (JSON.parse(result) as FetchMarkdownFileResponse) : null;
};

export const setBlogItemKV = async (
  env: Env,
  slug: string,
  lang: string,
  value: FetchMarkdownFileResponse
) => {
  const host = new URL(env.DOMAIN).hostname;
  await env.KV.put(`${host}/blogs/${slug}/${lang}`, JSON.stringify(value));
};

export const getBlogList = async (
  path: string = "article",
  page: number = 1,
  limit: number = -1
) => {
  const result = await fetchRepoContents(
    "https://github.com/ZissyW/remix-basic-template",
    path,
    page,
    limit
  );
  return result;
};

export const getBlogContent = async (
  path: string,
  lang: string = defaultLocale
) => {
  const result = await fetchMDContent(
    "https://github.com/ZissyW/remix-basic-template",
    "article",
    `${path}/${lang}.md`
  );
  return result;
};
