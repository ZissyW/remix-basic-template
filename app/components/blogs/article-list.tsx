import clsx from "clsx";
import { Link } from "~/i18n";

interface ArticleListSectionProps extends React.ComponentProps<"section"> {
  heading?: string;
  description?: string;
  list: Array<{
    title: string;
    cover?: string;
    description: string;
    createdAt: string;
    path: string;
  }>;
}

export const ArticleListSection = ({
  className,
  heading,
  description,
  list,
  ...props
}: ArticleListSectionProps) => {
  const showHeading = !!heading || !!description;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((popluarItem, i) => (
            <Link
              key={i}
              to={`/blogs/${popluarItem.path}`}
              title={popluarItem.title}
              className="rounded overflow-hidden bg-zinc-800"
            >
              <div className="aspect-video bg-zinc-800">
                {popluarItem.cover && (
                  <img
                    className="w-full h-full object-cover"
                    src={popluarItem.cover}
                    alt={popluarItem.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-4 bg-black/20">
                <div className="text-sm text-zinc-400">
                  {popluarItem.createdAt}
                </div>
                <h2 className="text-lg font-bold line-clamp-1">
                  {popluarItem.title}
                </h2>
                <p className="text-sm text-zinc-500 line-clamp-3">
                  {popluarItem.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
