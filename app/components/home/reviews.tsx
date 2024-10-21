import clsx from "clsx";

interface ReviewsSectionProps extends React.ComponentProps<"section"> {
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
export const ReviewsSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: ReviewsSectionProps) => {
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
      <ul className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((feature, fi) => (
          <li key={fi} className="bg-zinc-800 rounded">
            <div className="flex flex-col h-full bg-black/20 p-6">
              {/* <div className="w-10 h-10 mb-4">
              {!feature.icon && (
                <div className="w-full h-full bg-zinc-800 text-white flex items-center justify-center rounded">
                  {fi + 1}
                </div>
              )}
            </div> */}
              <div>
                <p className="text-lg font-bold mb-2">{feature.title}</p>
                <p className="text-sm text-zinc-400">{feature.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
