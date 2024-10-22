import clsx from "clsx";
import NavLogo from "~/assets/nav_logo.webp?url";

import { localeData, locales, Link, useRootLoaderData } from "~/i18n";

interface FooterProps extends Omit<React.ComponentProps<"footer">, "children"> {
  navLinks: { label: string; path: string }[];
  copyright: string;
}
export const Footer = ({
  className,
  navLinks,
  copyright,
  ...props
}: FooterProps) => {
  const loaderData = useRootLoaderData();
  return (
    <footer className={clsx(className)} {...props}>
      <div className="container text-white">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-20">
            <img
              className="h-3/4 object-contain"
              src={NavLogo}
              alt="Miraibo Go Logo"
            />
          </div>
          <nav className="flex gap-x-6 gap-y-2 flex-wrap overflow-hidden justify-center">
            {navLinks.map((link) => (
              <Link
                className="hover:underline"
                to={link.path}
                key={link.path}
                lang={loaderData?.lang}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-zinc-800" />
      <div className="container py-4 gap-2 flex items-center flex-col md:flex-row-reverse">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {locales.map((locale) => {
            const localeItem = localeData.find((item) => item.code === locale);
            if (!localeItem) return null;
            return (
              <Link
                to="/"
                key={locale}
                lang={locale}
                className="flex-shrink-0 text-sm hover:underline"
                reloadDocument
              >
                {localeItem.name}
              </Link>
            );
          })}
        </div>
        <div className="grow" />
        <p className="text-sm text-zinc-200">{copyright}</p>
      </div>
    </footer>
  );
};
