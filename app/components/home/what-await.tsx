import clsx from "clsx";

interface WhatAwaitSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  list: Array<{
    title: string;
    description: string;
    thumbnail: string;
  }>;
}
export const WhatAwaitSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: WhatAwaitSectionProps) => {
  const showHeading = !!heading && !!description;

  return (
    <section className={clsx(className)} {...props}>
      {showHeading && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-1">{heading}</h2>
          <p className="text-base text-zinc-500 text-center max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        {[
          list.filter((_, i) => i % 2 === 0),
          list.filter((_, i) => i % 2 !== 0),
        ].map((features, i) => {
          return (
            <ul key={i} className="flex-1 min-w-0 flex flex-col gap-6">
              {features.map((feature, fi) => (
                <li
                  key={`${i}-${fi}`}
                  className={clsx("flex flex-col bg-zinc-900", {
                    "md:flex-col-reverse": i % 2 !== 0,
                  })}
                >
                  <img
                    className="mb-2 rounded-sm aspect-video"
                    src={feature.thumbnail}
                    alt={feature.title}
                  />
                  <div className="p-2">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-base text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
};
