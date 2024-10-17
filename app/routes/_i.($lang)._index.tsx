import {
  MetaFunction,
  LoaderFunctionArgs,
  MetaDescriptor,
} from "@remix-run/cloudflare";

import clsx from "clsx";
import { useLoaderData } from "@remix-run/react";

import { createSeoMetas } from "~/utils/seo";

import PageBg from "~/assets/page-bg.webp";
import Cover from "~/assets/miraibo-go-cover.webp?url";
import Divider from "~/assets/divider.webp";

import Features1 from "~/assets/features-1.webp";
import Features3 from "~/assets/features-3.webp";
import Features4 from "~/assets/features-4.webp";
import Features5 from "~/assets/features-5.webp";

import {
  getTranslations,
  getMessage,
  useTranslations,
  type LANG,
} from "~/locales";

import {
  IconBrandAppstore,
  IconBrandGooglePlay,
  IconBrandWindows,
} from "@tabler/icons-react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const meta: MetaDescriptor[] = [
    { title: data.meta.title },
    {
      name: "description",
      content: data.meta.description,
    },
    {
      property: "og:title",
      content: data.meta.ogTitle,
    },
    { property: "og:site_name", content: data.meta.ogSiteName },
    {
      property: "og:description",
      content: data.meta.ogDescription,
    },
    {
      property: "og:image",
      content: Cover,
    },
  ];

  meta.push(...data.seoMetas);

  return meta;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const t = await getTranslations(params.lang, "home.meta");
  const messages = await getMessage<LANG["home"]["content"]>(
    params.lang,
    "home.content"
  );
  const seoMetas = createSeoMetas(new URL(request.url), false, params.lang);

  const meta = {
    title: t("title"),
    description: t("description"),
    ogTitle: t("og:title"),
    ogSiteName: t("og:site_name"),
    ogDescription: t("og:description"),
  };

  return { meta, seoMetas, messages };
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  const t = useTranslations(loaderData.messages);
  const features = loaderData.messages.features.list.map((item, i) => ({
    ...item,
    thumbnail: featuresThumbnail[i],
  }));

  const dives = loaderData.messages.dives.list;

  return (
    <div className="bg-zinc-50">
      <div className="relative">
        <div className="container relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-6 pt-24 md:pt-32 pb-32 lg:pb-36">
            <div className="flex-[2] min-w-0 w-full">
              <h1 className="text-3xl font-bold mb-4">{t("hero.heading")}</h1>
              <p className="text-base text-zinc-700 mb-6">
                {t("hero.parameter")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {actionLinks.map(({ icon: Icon, ...item }, i) => (
                  <a
                    className="flex items-center bg-zinc-950 text-white rounded p-2"
                    href={item.href}
                    key={i}
                    target="_blank"
                    title={item.label}
                  >
                    <Icon className="mr-2" size={36} />
                    <div>
                      <p className="text-xs leading-none text-zinc-100">
                        {t("hero.get-it-on")}
                      </p>
                      <p className="text-sm leading-none font-medium whitespace-nowrap">
                        {item.label}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {t("hero.sub-param")}
              </p>
            </div>
            <div className="flex-[2] xl:flex-[3] min-w-0 w-full aspect-video">
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/d1PMlQME8fw?si=ZT6gQC37TVNjZtQq"
                title="The mobile monster-themed open world survival game available now!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 inset-x-0 opacity-20">
          <img
            className="w-full h-full object-bottom object-cover select-none pointer-events-none"
            src={PageBg}
            alt="background of miraibo go website"
          />
        </div>
      </div>

      <div className="container max-w-screen-xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            {t("features.heading")}
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            {t("features.parameter")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {[
            features.filter((_, i) => i % 2 === 0),
            features.filter((_, i) => i % 2 !== 0),
          ].map((features, i) => {
            return (
              <ul key={i} className="flex-1 min-w-0 flex flex-col gap-4">
                {features.map((feature, fi) => (
                  <li
                    key={`${i}-${fi}`}
                    className={clsx("flex flex-col bg-white", {
                      "md:flex-col-reverse": i % 2 !== 0,
                    })}
                  >
                    <div className="p-2">
                      <img src={feature.thumbnail} alt={feature.title} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <p className="text-base text-zinc-700">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
      <div className="my-4">
        <img
          className="w-full object-cover md:object-contain max-h-28 mix-blend-darken my-4"
          src={Divider}
          alt="divider"
        />
      </div>

      <div className="container mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            {t("dives.heading")}
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            {t("dives.parameter")}
          </p>
        </div>

        <div>
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dives.map((dive, i) => (
              <li className="border bg-white rounded p-3" key={i}>
                <h3 className="text-lg font-medium">{dive.title}</h3>
                <p className="text-sm">{dive.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="max-w-screen-md mx-auto pb-16">
          <h2 className="text-3xl font-bold text-center mb-2">
            {t("creator-program.heading")}
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            {t("creator-program.parameter")}
          </p>
          <div className="max-w-screen-sm mt-6 mx-auto">
            <a
              className="w-96 mx-auto flex items-center justify-center bg-[#2a5fb8] text-white rounded p-2 mb-4"
              href="#"
            >
              {t("creator-program.learn-more")}
            </a>
            <p className="text-xs text-center text-zinc-600">
              {t("creator-program.sub-param")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container max-w-screen-xl py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              {t("social-proof.heading")}
            </h2>
            <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
              {t("social-proof.parameter")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userReviewList.map((reviewList, i) => {
              return (
                <ul key={i} className="flex flex-col gap-4">
                  {reviewList.map((reviewItem, ri) => {
                    return (
                      <li
                        className="p-4 bg-white rounded border border-zinc-100 relative shadow-lg shadow-zinc-200/30"
                        key={`${i}-${ri}`}
                      >
                        <p className="font-bold text-base">
                          {reviewItem.title}
                        </p>
                        <p className="text-sm text-zinc-700">
                          {reviewItem.content}
                        </p>
                        <p className="mt-4 text-xs text-zinc-400">
                          {reviewItem.user}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container max-w-screen-xl py-16">
          <h2 className="text-3xl font-bold text-center mb-2">
            {t("faqs.heading")}
          </h2>

          {loaderData.messages.faqs.sub.map((item, i) => {
            return (
              <div key={i}>
                <h3 className="text-xl text-zinc-700 text-center max-w-3xl mx-auto">
                  {item.heading}
                </h3>
                <ul className="max-w-2xl w-full mx-auto mt-4">
                  {item.list.map((faq, i) => (
                    <li className="mb-4 last-of-type:mb-0" key={i}>
                      <h4 className="text-lg font-bold">{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const actionLinks = [
  {
    icon: IconBrandAppstore,
    label: "App Store",
    href: "https://apps.apple.com/us/app/miraibo-go/id6547850275",
  },
  {
    icon: IconBrandGooglePlay,
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.dream.miraibo",
  },
  {
    icon: IconBrandWindows,
    label: "PC Platform",
    href: "https://miraibo.onelink.me/Z2Cz/uczpnr9s",
  },
];

const featuresThumbnail = [Features1, Features3, Features4, Features5];

const userReviewList: {
  title: string;
  content: string;
  rating: number;
  user: string;
}[][] = [
  [
    {
      title: "Palworld mobile",
      content:
        "To everyone complaining about the game allowing you to download before the game is actually live welcome to mobile gaming! That’s how it works a lot of the time now. The game still went live a day before expected release. As far as the game goes it’s literally palworld with different creatures. Almost every other aspect is exactly the same. It’s not bad but I think a little too ambitious for mobile. Game suffers a little from the controls being small. Probably better on a tablet. Overall though really cool",
      rating: 5,
      user: "blade11235",
    },
    {
      title: "One of the best game of the year",
      content:
        "I downloaded this game because I thought it looked interesting and that it looks a lot like a free version of Palworld. it’s a really fun game and seeing as how it just came out there are a few bugs but what new game doesn’t. I would definitely check out this game if you are bored and just wanna have a fun game to play here and there.",
      rating: 5,
      user: "TangentJoker",
    },
  ],
  [
    {
      title: "Great game, controls are cluttered",
      content:
        "The game is great. I’m not sure why people are complaining about it. You can have your own world for your guild and it’s really helpful. The game has been fun and doesn’t seem to be pay to win, most of the stuff is cosmetic. Some of the enemies are quite difficult but I enjoy a good challenge.",
      rating: 5,
      user: "DocWild_1",
    },
    {
      title: "Gameplay",
      content:
        "So far I keep getting booted, then I’ll have to completely restart. It’s good otherwise but I think the layout should be “sideways” to have room for commands. Also if I do get into a lobby it takes forever to catch one creature, so having to restart on a constant is extremely frustrating.",
      rating: 5,
      user: "kinkyteddy69",
    },
    {
      title: "Lol game",
      content:
        "Game just launched globally and I have great expectations already. The opening screen is fully animated and looks great and so far the experience of simply getting the game started is way less tedious than most other games I’ve played of this sort.",
      rating: 4,
      user: "chaaaaaaazoid",
    },
  ],
  [
    {
      title: "Has potential",
      content:
        "The game definitely has potential and sparks my interest. Also, you can play in landscape mode. There is a direct button on the gameplay screen (not hidden away in the settings) that orients the gameplay.",
      rating: 4,
      user: "jason_nato",
    },

    {
      title: "You need this game",
      content: "anyways here's a couple of my favorite sprites from Miraibo Go",
      rating: 5,
      user: "PrepareToHi",
    },
    {
      title: "Wish I could give 6 stars",
      content:
        "I can't believe I caught this ON STREAM, I'm so addicted to Miraibo Go",
      rating: 5,
      user: "Arar_VT",
    },
    {
      title: "It knows what I like",
      content:
        "I decided against my better judgement to go live at 8:30 AM because i cannot stop playing Miraibo Go and holy shit it's so good",
      rating: 5,
      user: "Yoshiality",
    },
  ],
];
