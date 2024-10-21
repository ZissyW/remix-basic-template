import clsx from "clsx";

interface PopularSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
}
export const PopluarSection = ({
  className,
  heading,
  description,
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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="aspect-video rounded bg-zinc-700" />
        <div className="aspect-video rounded bg-zinc-700" />
        <div className="aspect-video rounded bg-zinc-700" />
        <div className="aspect-video rounded bg-zinc-700" />
        <div className="aspect-video rounded bg-zinc-700" />
        <div className="aspect-video rounded bg-zinc-700" />
      </div>
    </section>
  );
};
