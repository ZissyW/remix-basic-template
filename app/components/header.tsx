import clsx from "clsx";
import { useMemo, useState } from "react";
import { NavLink } from "@remix-run/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useWindowScroll } from "~/hooks";

import NavLogo from "~/assets/nav_logo.webp?url";

interface HeaderProps extends Omit<React.ComponentProps<"header">, "children"> {
  navLinks: { path: string; label: string }[];
}
export const Header = ({ className, navLinks, ...props }: HeaderProps) => {
  const [{ y }] = useWindowScroll();

  const bgOpacity = useMemo(() => {
    const max = 100;
    const min = 40;
    if (!y || y < min) return 0;
    if (y > max) return 1;
    return (y - min) / (max - min);
  }, [y]);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 transition-all bg-transparent md:data-[scrolled=true]:backdrop-blur-[2px] data-[scrolled=true]:bg-white/80 z-20",
        className
      )}
      data-scrolled={bgOpacity > 0.8}
      {...props}
    >
      <div className="h-full flex items-center container">
        <div className="h-3/4">
          <img
            className="h-full object-contain"
            src={NavLogo}
            alt="Miraibo Go Logo"
          />
        </div>
        <div className="grow" />
        <MobileNav className="md:hidden" navLinks={navLinks} />
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <NavLink className="hover:underline" to={link.path} key={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

interface MobileNavProps extends Omit<React.ComponentProps<"div">, "children"> {
  navLinks: HeaderProps["navLinks"];
}
const MobileNav = ({ className, navLinks, ...props }: MobileNavProps) => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <div className={clsx(className)} {...props}>
      <div>
        <IconMenu2 onClick={open} />
      </div>
      <div
        className="hidden data-[visible=true]:block relative"
        data-visible={visible}
      >
        <div className="fixed top-0 inset-x-0 p-2 z-10">
          <div className="bg-white rounded">
            <div className="p-2 flex items-center">
              <div>
                <img
                  className="h-12 object-contain"
                  src={NavLogo}
                  alt="Miraibo Go Logo"
                />
              </div>
              <div className="grow" />
              <div className="text-zinc-700">
                <IconX size={30} onClick={close} />
              </div>
            </div>
            <div className="mt-4 p-2 pb-5">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <NavLink
                    className="px-2 text-lg rounded"
                    key={link.path}
                    to={link.path}
                    onClick={close}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div
          className="fixed inset-x-0 inset-y-0 bg-black/60"
          onClick={close}
        />
      </div>
    </div>
  );
};
