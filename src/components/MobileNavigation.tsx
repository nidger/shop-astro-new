
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ResponsivePanel } from './ResponsivePanel';
import { navigationLinks } from "@/data/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const trigger = (
    <Button variant="outline" size="sm">
      <Menu className="h-4 w-4" />
      <span className="sr-only">Open menu</span>
    </Button>
  );

  return (
    <ResponsivePanel open={isOpen} onOpenChange={setIsOpen} trigger={trigger} sheetSide="left">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Menu</h4>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {navigationLinks.map((link) => {
            if (link.items) {
              return link.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ));
            } else {
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </a>
              );
            }
          })}
        </div>
      </div>
    </ResponsivePanel>
  );
}

