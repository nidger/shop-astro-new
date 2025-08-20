import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
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
  );
}
