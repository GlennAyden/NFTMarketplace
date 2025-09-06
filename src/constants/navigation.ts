export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Explore" },
  { href: "/mint", label: "Mint" },
  { href: "/create", label: "Create" },
];
