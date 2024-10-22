import clsx from "clsx";
import { useState } from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

interface HeroSectionProps extends React.ComponentProps<"section"> {
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

export const HeroSection = ({
  className,
  heading,
  description,
  actionText,
  actionDesc,
  actionLink,
  shareText,
  shareUrl,
  showShare = true,
  iframeType,
  iframeLink,
  iframeTitle,
  iframeCover,
  ...props
}: HeroSectionProps) => {
  const [doPlay, setDoPlay] = useState(false);

  return (
    <section className={clsx(className)} {...props}>
      <div className="flex flex-col-reverse md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-[2] min-w-0 w-full">
          <h1 className="text-3xl font-bold mb-4">{heading}</h1>
          <p className="text-base text-zinc-400 mb-6">{description}</p>
          <div>
            {actionLink ? (
              <a
                className="flex items-center bg-blue-500 text-white rounded h-10 px-4"
                href={actionLink}
              >
                {actionText}
              </a>
            ) : (
              <button
                className="flex items-center bg-blue-500 text-white rounded h-10 px-4"
                onClick={() => setDoPlay(true)}
              >
                {actionText}
              </button>
            )}
          </div>
          {actionDesc && (
            <p className="text-xs text-zinc-500 mt-2">{actionDesc}</p>
          )}

          {showShare && shareUrl && (
            <div className="mt-6">
              {shareText && (
                <p className="text-sm text-zinc-300 font-bold my-2">
                  {shareText}
                </p>
              )}
              <ShareGroup shareUrl={shareUrl} shareTitle={heading} />
            </div>
          )}
        </div>
        <div className="flex-[2] xl:flex-[3] min-w-0 w-full aspect-video">
          {iframeType === "youtube" && (
            <iframe
              className="w-full h-full rounded"
              src={iframeLink}
              title={iframeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
          {iframeType === "game" &&
            (!doPlay && iframeCover ? (
              <div
                className="w-full h-full relative rounded overflow-hidden"
                onClick={() => setDoPlay(true)}
              >
                <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center z-10 bg-transparent hover:bg-black/30 transition-all cursor-pointer group">
                  <div className="text-white max-w-md text-center mb-6 hidden group-hover:block">
                    <IconPlayerPlayFilled size={48} />
                  </div>
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={iframeCover}
                  title={iframeTitle}
                />
              </div>
            ) : (
              <iframe
                className="w-full h-full rounded"
                src={iframeLink}
                title={iframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ))}
        </div>
      </div>
    </section>
  );
};

const ShareGroup = ({
  shareUrl,
  shareTitle,
}: {
  shareUrl: string;
  shareTitle: string;
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <FacebookShareButton title={shareTitle} url={shareUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton title={shareTitle} url={shareUrl}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton title={shareTitle} url={shareUrl}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TelegramShareButton title={shareTitle} url={shareUrl}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <LineShareButton title={shareTitle} url={shareUrl}>
        <LineIcon size={32} round />
      </LineShareButton>
    </div>
  );
};
