import { type LANG, getTranslations } from "~/locales";

export const createBlogsContent = (lang: LANG["blogs"]): BlogsContent => {
  const t = getTranslations(lang, "content");

  return {
    hero: {
      heading: t("hero.heading"),
      description: t("hero.description"),
    },
  };
};

interface BlogsContent {
  hero: Hero;
}

interface Hero {
  heading: string;
  description: string;
}
