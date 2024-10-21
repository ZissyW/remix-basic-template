import clsx from "clsx";

interface CallActionSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  sectionCover?: string;
}
export const CallActionSection = ({
  className,
  heading,
  description,
  buttonText,
  buttonLink,
  sectionCover,
  ...props
}: CallActionSectionProps) => {
  return (
    <section className={clsx("relative", className)} {...props}>
      <div className="relative container z-10 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-1">{heading}</h2>
          <p className="text-base text-zinc-400 text-center max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <a
            href={buttonLink}
            className="bg-blue-500 text-white rounded h-10 px-4 flex items-center justify-center"
          >
            {buttonText}
          </a>
        </div>
      </div>
      {sectionCover && (
        <div className="absolute inset-x-0 inset-y-0">
          <div className="absolute inset-x-0 inset-y-0 bg-black/80" />
          <img
            className="w-full h-full object-cover"
            src={sectionCover}
            alt={heading}
          />
        </div>
      )}
    </section>
  );
};
