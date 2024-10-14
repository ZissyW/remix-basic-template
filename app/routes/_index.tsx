import type { MetaFunction } from "@remix-run/cloudflare";

import clsx from "clsx";
import PageBg from "~/assets/page-bg.webp";
import Divider from "~/assets/divider.webp";

import Features1 from "~/assets/features-1.webp";
import Features3 from "~/assets/features-3.webp";
import Features4 from "~/assets/features-4.webp";
import Features5 from "~/assets/features-5.webp";

import {
  IconBrandAppstore,
  IconBrandGooglePlay,
  IconBrandWindows,
} from "@tabler/icons-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Miraibo Go - Pal-like open-world survival game" },
    {
      name: "description",
      content:
        'Join forces with mysterious creatures known as "Mira" to fight, farm, build, and collaborate in this new multiplayer, open-world survival and crafting game!',
    },
  ];
};

const links = [
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

const features = [
  {
    title: "Tame the Miras",
    description:
      "Over 100 Miras with different skills and elements can be battled and caught to accompany you on your adventure across an expansive Miraibo Go world.",
    thumbnail: Features1,
  },
  {
    title: "Build without limits",
    description:
      "Assign Miras to different tasks based on their skills, including farming, gathering, and construction. But be sure to look after your Miras to keep them in fighting shape.",
    thumbnail: Features3,
  },
  {
    title: "Mounted Exploration",
    description:
      "Explore, farm, build and fight alongside your miras and explore the open world!",
    thumbnail: Features4,
  },
  {
    title: "Multiplayer Battle",
    description:
      "Go alone or forge alliances with friends and your favorite content creators to survive this dangerous world.",
    thumbnail: Features5,
  },
];

const dives = [
  { title: "Tame the Miras", description: "Hundreds of Miras await you!" },
  {
    title: "Build without Limits",
    description: "Live together with your tame miras!",
  },
  {
    title: "Mounted Exploration",
    description: "Fight alongside your tame monsters!",
  },
  {
    title: "Multiplayer Battle",
    description: "Explore and adventure with your friends!",
  },
];

export default function Page() {
  return (
    <div className="bg-zinc-50">
      <div className="relative">
        <div className="container relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-6 pt-24 md:pt-32 pb-32 lg:pb-36">
            <div className="flex-[2] min-w-0 w-full">
              <h1 className="text-3xl font-bold mb-4">
                Miraibo Go - Pal-like open-world survival game
              </h1>
              <p className="text-base text-zinc-700 mb-6">
                Dive into the world of Miraibo Go, embark on an epic adventure,
                uncover hidden treasures, conquer the Miraibo world, battle
                fierce opponents.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {links.map(({ icon: Icon, ...item }, i) => (
                  <a
                    className="flex items-center bg-[#2a5fb8] text-white rounded p-2"
                    href={item.href}
                    key={i}
                    target="_blank"
                    title={item.label}
                  >
                    <Icon className="mr-2" size={36} />
                    <div>
                      <p className="text-xs leading-none text-zinc-100">
                        Get it on
                      </p>
                      <p className="text-base leading-none font-medium">
                        {item.label}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Miraibo Go is free to play on mobile devices and PC and offers
                cross-platform gaming support.
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
          />
        </div>
      </div>

      <div className="container max-w-screen-xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            What awaits you in Miraibo Go
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            Fight, farm, build and work alongside mysterious creatures called
            "Mira" in this completely new multiplayer, open world survival and
            crafting game!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {[
            features.filter((_, i) => i % 2 === 0),
            features.filter((_, i) => i % 2 !== 0),
          ].map((features, i) => {
            return (
              <ul className="flex-1 min-w-0 flex flex-col gap-4">
                {features.map((feature) => (
                  <li
                    className={clsx("flex flex-col bg-white", {
                      "md:flex-col-reverse": i % 2 !== 0,
                    })}
                  >
                    <div className="p-2">
                      <img src={feature.thumbnail} />
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
            Dive into the world of Miraibo Go
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            Discover a new kind of Pokémon experience with Miraibo Go! Capture
            wild Mira, and challenge powerful bosses in this innovative
            open-world game.
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
            Miraibo Go Creator Program
          </h2>
          <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
            The Miraibo Go Creator Program is a unique community of content
            creators focused on producing engaging and high-quality content for
            the dynamic world of Miraibo!
          </p>
          <div className="max-w-screen-sm mt-6 mx-auto">
            <a
              className="w-96 mx-auto flex items-center justify-center bg-[#2a5fb8] text-white rounded p-2 mb-4"
              href="#"
            >
              Learn More for Miraibo Go Creator Program
            </a>
            <p className="text-xs text-center text-zinc-600">
              Whether you're a Youtuber, Streamer or Blogger, we want to build
              the world of Miraibo Go with you.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container max-w-screen-xl py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              Miraibo Go Loved by people worldwide
            </h2>
            <p className="text-base text-zinc-700 text-center max-w-3xl mx-auto">
              Join the Miraibo Go craze and explore, fight, build and work with
              Mira!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userReviewList.map((reviewList, i) => {
              return (
                <ul className="flex flex-col gap-4">
                  {reviewList.map((reviewItem) => {
                    return (
                      <li
                        className="p-4 bg-white rounded border border-zinc-100 relative shadow-lg shadow-zinc-200/30"
                        key={i}
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
            Miraibo Go FAQs
          </h2>

          <div>
            <h3 className="text-xl text-zinc-700 text-center max-w-3xl mx-auto">
              About Miraibo Go Game Content
            </h3>
            <ul className="max-w-2xl w-full mx-auto mt-4">
              {faqs.map((faq, i) => (
                <li className="mb-4 last-of-type:mb-0" key={i}>
                  <h4 className="text-lg font-bold">{faq.question}</h4>
                  <p>{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

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

const faqs = [
  {
    question: "Can I play Miraibo Go with my friends?",
    answer:
      "Yes, Miraibo Go has full shared-world multiplayer. you can play the game with your friends!",
  },

  {
    question: "Where can I play Miraibo Go?",
    answer:
      "Miraibo Go is currently playable PC, iOS Device, Android Device with crossplay support.",
  },

  {
    question: "Can I play Miraibo Go on different devices?",
    answer:
      "Yes, Miraibo Go offers cross-platform play support so the adventure can enjoyed at home and on the go, and the game is free to play on both mobile and PC.",
  },

  {
    question: "Do Mira evolve in Miraibo Go?",
    answer:
      "No, miras in Miraibo Go do not evolve. What you see is what you get.",
  },

  {
    question: "How many Mira in Miraibo Go?",
    answer:
      "The hundreds Miras can be battled and caught across an expansive Miraibo Go open world",
  },

  {
    question: "Does Miraibo Go support crossplay?",
    answer:
      "Yes, Miraibo Go offers cross-platform play support, you can enjoy it at home and on the go.",
  },
];
