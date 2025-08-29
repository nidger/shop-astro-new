import { useState, useMemo } from 'react';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SortDropdown, sortOptions, type SortOption } from './SortDropdown';

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

  return (
    <div className="px-6 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{productCount} products</p>
        </div>
        <SortDropdown onSortChange={setSortOrder} defaultValue={sortOrder} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}