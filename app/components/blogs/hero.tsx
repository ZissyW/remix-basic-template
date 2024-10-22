import clsx from "clsx";

interface HeroSectionProps extends React.ComponentProps<"section"> {
  heading: string;
  description: string;
}

export const HeroSection = ({
  className,
  heading,
  description,
  ...props
}: HeroSectionProps) => {
  return (
    <section className={clsx(className)} {...props}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{heading}</h1>
        <p className="text-base text-gray-500">{description}</p>
      </div>
    </section>
  );
};
