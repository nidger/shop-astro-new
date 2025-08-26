import * as React from "react";
import { navigate } from "astro:transitions/client";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

// Type definition for the search result item
type SearchResult = {
  item: {
    id: string;
    title: string;
    slug: string;
      images: { src: string; alt: string }[];
  };
};

export function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [fuse, setFuse] = React.useState<any>(null);
  const [results, setResults] = React.useState<SearchResult[]>([]);

  // Keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lazy-load Fuse.js and product data when search is opened
  React.useEffect(() => {
    if (open && !fuse) {
      Promise.all([
        import("fuse.js"),
        import("@/data/products"),
      ]).then(([{ default: Fuse }, { allProducts }]) => {
        setFuse(
          new Fuse(allProducts, {
            keys: ["title", "description"],
            includeScore: true,
            threshold: 0.3,
          })
        );
      });
    }
  }, [open, fuse]);

  // Perform search when query changes
  React.useEffect(() => {
    if (fuse && query.length > 0) {
      const searchResults = fuse.search(query);
      setResults(searchResults as SearchResult[]);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleSelect = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="search-description" className="overflow-hidden p-0 shadow-lg w-[calc(100%-2rem)] rounded-lg sm:w-full sm:max-w-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
          <DialogDescription id="search-description">Search for products in our store.</DialogDescription>
        </DialogHeader>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput 
            placeholder="Search products..." 
            value={query} 
            onValueChange={setQuery} 
          />
          <CommandList>
            <CommandEmpty>{query.length > 2 ? "No results found." : ""}</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Products">
                {results.map(({ item }) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    className="cursor-pointer"
                    onSelect={() => handleSelect(`/products/${item.slug}`)}
                  >
                    <img src={item.images[0].src.src} alt={item.title} className="h-8 w-8 mr-4 rounded-sm" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
