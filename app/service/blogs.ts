import { fetchRepoContents, fetchMDContent } from "~/utils/github";
import { defaultLocale } from "~/i18n";

export const getBlogList = async () => {
  const result = await fetchRepoContents(
    "https://github.com/ZissyW/remix-basic-template",
    "blogs"
  );
  return result;
};

export const getBlogContent = async (
  path: string,
  lang: string = defaultLocale
) => {
  const result = await fetchMDContent(
    "https://github.com/ZissyW/remix-basic-template",
    "blogs",
    `${path}/${lang}.md`
  );
  return result;
};
