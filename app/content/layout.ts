import { type LANG, getTranslations } from "~/locales";

export const createLayoutContent = (lang: LANG) => {
  const t = getTranslations(lang);

  const headerNavLinks = headerLinks.map((item) => ({
    path: item.path,
    label: t(`header.nav.${item.key}` as any),
  }));

  const footerNavLinks = footerLinks.map((item) => ({
    path: item.path,
    label: t(`footer.nav.${item.key}` as any),
  }));

  return {
    header: {
      navLinks: headerNavLinks,
    },
    footer: {
      navLinks: footerNavLinks,
      copyright: t("copyright"),
    },
  };
};

const headerLinks = [
  { path: "/", key: "index" },
  { path: "/blogs", key: "blogs" },
  { path: "/#what-await", key: "whatAwait" },
  { path: "/#reviews", key: "reviews" },
  { path: "/#faqs", key: "faqs" },
];
const footerLinks = [
  { path: "/", key: "index" },
  { path: "/blogs", key: "blogs" },
  { path: "/about", key: "about" },
  { path: "/privacy-policy", key: "privacy-policy" },
  { path: "/terms-of-service", key: "terms-of-service" },
  { path: "/contact", key: "contact" },
];
