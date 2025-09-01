import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ResponsivePanel } from './ResponsivePanel';

const collections = [
  {
    id: "summer",
    title: "SUMMER 2025",
  },
  {
    id: "apparel",
    title: "APPAREL",
  },
  {
    id: "stickers",
    title: "STICKERS",
  },
];

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
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Menu</h4>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-4">
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
      </div>
    </ResponsivePanel>
  );
}
