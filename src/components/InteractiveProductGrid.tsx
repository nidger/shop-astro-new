import { useState, useMemo } from 'react';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SortDropdown, sortOptions, type SortOption } from './SortDropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilterPanel } from './FilterPanel';

export function InteractiveProductGrid({ products, title, productCount }: { products: Product[], title: string, productCount: number }) {
  const [sortOrder, setSortOrder] = useState<SortOption>('price-asc');

  const sortedProducts = useMemo(() => {
    const sorted = [...products]; // Create a new array to avoid mutating the original
    
    const getPrice = (priceString: string) => parseFloat(priceString.replace(/[^\d.-]/g, ''));

    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => getPrice(b.price) - getPrice(a.price));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return sorted;
  }, [products, sortOrder]);

  const handleSortChange = (newSortOrder: SortOption) => {
    if (!document.startViewTransition) {
      setSortOrder(newSortOrder);
      return;
    }
    document.startViewTransition(() => {
      setSortOrder(newSortOrder);
    });
  };

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{productCount} products</p>
        </div>
        <div className="flex justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
              <FilterPanel />
            </PopoverContent>
          </Popover>
          <SortDropdown onSortChange={handleSortChange} defaultValue={sortOrder} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}