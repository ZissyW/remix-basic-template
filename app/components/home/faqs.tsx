import clsx from "clsx";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface FAQsSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  list: Array<{
    question: string;
    answer: string;
  }>;
}
export const FAQsSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: FAQsSectionProps) => {
  const [activeLine, setActiveLine] = useState(0);

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
      <ul className="flex flex-col gap-4 max-w-3xl mx-auto">
        {list.map((faq, i) => (
          <li
            className="rounded-lg bg-zinc-800 overflow-hidden transition-transform"
            key={i}
            value={`faq-${i}`}
          >
            <div
              className="flex items-center p-4 cursor-pointer"
              onClick={() => setActiveLine(i)}
            >
              <h3 className="grow">{faq.question}</h3>
              <IconChevronDown
                className="transition-transform -rotate-90 data-[active=true]:rotate-0"
                size={24}
                data-active={activeLine === i}
              />
            </div>
            <div
              className="border-t border-zinc-950/30 transition-all grid grid-flow-row grid-rows-[0] data-[active=true]:grid-rows-1"
              data-active={activeLine === i}
            >
              <p className="p-4 text-sm text-zinc-400">{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
