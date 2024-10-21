import { fetchRepoContents, fetchMDContent } from "~/utils/github";

export const getBlogList = async () => {
  const result = await fetchRepoContents(
    "https://github.com/remix-run/remix",
    "blogs"
  );
  return result;
};

export const getBlogContent = async (path: string, lang: string) => {
  const result = await fetchMDContent(
    "https://github.com/remix-run/remix",
    "blogs",
    `${path}/${lang}.md`
  );
  return result;
};
