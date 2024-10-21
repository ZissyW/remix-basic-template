import clsx from "clsx";

interface FeaturesSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  list: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}
export const FeaturesSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: FeaturesSectionProps) => {
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
          <li key={fi} className="flex flex-col rounded bg-black/30 p-6">
            <div className="w-10 h-10 mb-4">
              {!feature.icon && (
                <div className="w-full h-full bg-zinc-800 text-white flex items-center justify-center rounded">
                  {fi + 1}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-base text-zinc-400">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
