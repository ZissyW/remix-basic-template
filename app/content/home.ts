import { type LANG, getTranslations } from "~/locales";

import PageBg from "~/assets/page-bg.webp?url";
import Cover from "~/assets/miraibo-go-cover.webp?url";

import Features1 from "~/assets/features-1.webp?url";
import Features3 from "~/assets/features-3.webp?url";
import Features4 from "~/assets/features-4.webp?url";
import Features5 from "~/assets/features-5.webp?url";

const featuresThumbnail = [Features1, Features3, Features4, Features5];

export const createHomeContent = (lang: LANG["home"]): HomeContent => {
  const t = getTranslations(lang, "content");

  const whatAwait = lang.content.whatAwait.list.map((item, i) => ({
    ...item,
    thumbnail: featuresThumbnail[i],
  }));

  const features = lang.content.features.list.slice(0, 6);
  const howPlay = lang.content.howToPlay.list.slice(0, 3);
  const reviews = lang.content.reviews.list;
  const faqs = lang.content.faqs.list;

  return {
    hero: {
      heading: t("hero.heading"),
      description: t("hero.description"),
      actionText: t("hero.actionText"),
      actionDesc: t("hero.actionDesc"),
      iframeType: "game",
      iframeLink:
        "https://www.youtube.com/embed/d1PMlQME8fw?si=ZT6gQC37TVNjZtQq",
      iframeTitle: t("hero.heading"),
      iframeCover: Cover,
      shareText: t("hero.shareText"),
      showShare: true,
      shareUrl: "https://miraibogo.org",
    },
    popular: {
      list: [],
    },
    whatAwait: {
      heading: t("whatAwait.heading"),
      description: t("whatAwait.description"),
      list: whatAwait,
    },
    callAction: {
      heading: t("creatorProgram.heading"),
      description: t("creatorProgram.description"),
      buttonText: t("creatorProgram.buttonText"),
      buttonLink: "#",
      sectionCover: PageBg,
    },
    features: {
      heading: t("features.heading"),
      description: t("features.description"),
      list: features,
    },
    howPlay: {
      heading: t("howToPlay.heading"),
      description: t("howToPlay.description"),
      list: howPlay,
    },
    readyPlay: {
      heading: t("creatorProgram.heading"),
      description: t("creatorProgram.description"),
      buttonText: t("creatorProgram.buttonText"),
      buttonLink: "#",
    },
    reviews: {
      heading: t("reviews.heading"),
      description: t("reviews.description"),
      list: reviews,
    },
    faqs: {
      heading: t("faqs.heading"),
      description: t("faqs.description"),
      list: faqs,
    },
  } as HomeContent;
};

interface HomeContent {
  hero: Hero;
  popular: Popular;
  whatAwait: WhatAwait;
  callAction: CallAction;
  features: Features;
  howPlay: Features;
  readyPlay: CallAction;
  reviews: Reviews;
  faqs: FAQs;
}

interface Hero {
  heading: string;
  description: string;
  actionText: string;
  actionDesc: string;
  actionLink?: string;
  iframeType: "youtube" | "game";
  iframeLink: string;
  iframeTitle: string;
  iframeCover?: string;
  shareText?: string;
  showShare?: boolean;
  shareUrl?: string;
}

interface Popular {
  heading?: string;
  description?: string;
  list: Array<{ title: string; cover: string; link: string }>;
}

interface WhatAwait {
  heading?: string;
  description?: string;
  list: Array<{ title: string; description: string; thumbnail: string }>;
}

interface CallAction {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  sectionCover?: string;
}

interface Features {
  heading?: string;
  description?: string;
  list: Array<{ title: string; description: string }>;
}

interface Reviews {
  heading?: string;
  description?: string;
  list: Array<{
    title: string;
    content: string;
    rating: number;
    author: string;
    avatar?: string;
  }>;
}

interface FAQs {
  heading?: string;
  description?: string;
  list: Array<{ question: string; answer: string }>;
}
