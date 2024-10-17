import clsx from "clsx";
import { NavLink } from "@remix-run/react";
import NavLogo from "~/assets/nav_logo.webp?url";

interface FooterProps extends Omit<React.ComponentProps<"footer">, "children"> {
  navLinks: { label: string; path: string }[];
}
export const Footer = ({ className, navLinks, ...props }: FooterProps) => {
  return (
    <footer className={clsx(className)} {...props}>
      <div className="container">
        <div className="flex flex-col items-center justify-center pt-16 pb-8">
          <div className="h-20">
            <img
              className="h-3/4 object-contain"
              src={NavLogo}
              alt="Miraibo Go Logo"
            />
          </div>
          <nav className="flex gap-4">
            {navLinks.map((link) => (
              <NavLink
                className="hover:underline"
                to={link.path}
                key={link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-zinc-200" />
      <div className="container h-16 flex items-center">
        <p className="text-sm text-zinc-700">
          Copyright © 2024 miraibgo.org All rights reserved.
        </p>
      </div>
    </footer>
  );
};
