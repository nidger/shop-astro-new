import * as React from "react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const collections = [
  {
    id: "summer",
    title: "SUMMER 2025",
    description: "Bright, bold, and ready for the beach.",
  },
  {
    id: "apparel",
    title: "APPAREL",
    description: "Look good, feel good, code good.",
  },
  {
    id: "stickers",
    title: "STICKERS",
    description: "Decorate your gear with the coolest stickers in the galaxy.",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu className="z-50">
          <NavigationMenuList>
            <NavigationMenuItem>
              <a href="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {collections.map((collection) => (
                    <ListItem
                      key={collection.title}
                      title={collection.title}
                      href={`/collection/${collection.id}`}
                    >
                      {collection.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="/#contest-section">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contest
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 py-8">
              <a href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </a>
              <h3 className="text-lg font-medium">Collections</h3>
              {collections.map((collection) => (
                <a
                  key={collection.id}
                  href={`/collection/${collection.id}`}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {collection.title}
                </a>
              ))}
              <a href="/#contest-section" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Contest
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-card-hover focus:bg-card-hover",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
