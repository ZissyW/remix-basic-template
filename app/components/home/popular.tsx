import clsx from "clsx";

interface PopularSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  list: Array<{
    title: string;
    cover: string;
    link: string;
  }>;
}
export const PopluarSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: PopularSectionProps) => {
  const showHeading = !!heading && !!description;

  return (
    <section className={clsx(className)} {...props}>
      {showHeading && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-1">{heading}</h2>
          <p className="text-base text-zinc-500 text-center max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      )}
      {!!list.length && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {list.map((popluarItem, i) => (
            <a
              key={i}
              href={popluarItem.link}
              className="aspect-video rounded overflow-hidden bg-zinc-700"
              title={popluarItem.title}
            >
              <img
                className="w-full h-full object-cover"
                src={popluarItem.cover}
                alt={popluarItem.title}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}
    </section>
  );
};
