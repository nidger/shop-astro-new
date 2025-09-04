
export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavLink {
  title: string;
  href?: string;
  items?: NavItem[];
}

export const navigationLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Collections",
    items: [
      {
        title: "SUMMER 2025",
        href: "/collection/summer",
        description: "Bright, bold, and ready for the beach.",
      },
      {
        title: "APPAREL",
        href: "/collection/apparel",
        description: "Look good, feel good, code good.",
      },
      {
        title: "STICKERS",
        href: "/collection/stickers",
        description: "Decorate your gear with the coolest stickers in the galaxy.",
      },
    ],
  },
  {
    title: "Contest",
    href: "/#contest-section",
  },
];
