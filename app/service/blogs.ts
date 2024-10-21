import { fetchRepoContents, fetchMDContent } from "~/utils/github";
import { defaultLocale } from "~/i18n";

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
