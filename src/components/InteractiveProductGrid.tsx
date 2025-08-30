import { useState, useMemo } from 'react';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SortDropdown, sortOptions, type SortOption } from './SortDropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilterPanel } from './FilterPanel';
import { ActiveFilterPills } from './ActiveFilterPills';

interface PriceRange {
  from?: number;
  to?: number;
}

export function InteractiveProductGrid({ products, title }: { products: Product[], title: string }) {
  const [sortOrder, setSortOrder] = useState<SortOption>('price-asc');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    const getPrice = (priceString: string) => parseFloat(priceString.replace(/[^\d.-]/g, ''));

    let filtered = [...products];

    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors && p.colors.some(c => selectedColors.includes(c)));
    }
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (priceRange.from !== undefined && priceRange.from >= 0) {
      filtered = filtered.filter(p => getPrice(p.price) >= priceRange.from);
    }
    if (priceRange.to !== undefined && priceRange.to >= 0) {
      filtered = filtered.filter(p => getPrice(p.price) <= priceRange.to);
    }

    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => getPrice(b.price) - getPrice(a.price));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return filtered;
  }, [products, sortOrder, selectedColors, selectedSizes, priceRange]);

  const updateWithTransition = (updater: () => void) => {
    if (!document.startViewTransition) {
      updater();
      return;
    }
    document.startViewTransition(updater);
  };

  const handleSortChange = (newSortOrder: SortOption) => updateWithTransition(() => setSortOrder(newSortOrder));
  
  const handleColorChange = (colors: string[]) => {
    updateWithTransition(() => setSelectedColors(colors));
    // To keep the panel open to allow for multi-select, comment out the line below.
    setIsFilterOpen(false);
  };
  
  const handleSizeChange = (sizes: string[]) => {
    updateWithTransition(() => setSelectedSizes(sizes));
    // To keep the panel open to allow for multi-select, comment out the line below.
    setIsFilterOpen(false);
  };
  
  const handlePriceChange = (newPrice: PriceRange) => {
    updateWithTransition(() => setPriceRange(prev => ({...prev, ...newPrice})));
  };

  const handleClearColor = (colorToClear: string) => {
    updateWithTransition(() => setSelectedColors(prev => prev.filter(c => c !== colorToClear)));
  };
  const handleClearSize = (sizeToClear: string) => {
    updateWithTransition(() => setSelectedSizes(prev => prev.filter(s => s !== sizeToClear)));
  };
  const handleClearPrice = () => {
    updateWithTransition(() => setPriceRange({}));
  };

  return (
    <div className="px-6 py-8">
      <div className="mb-4">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{filteredAndSortedProducts.length} products</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">Filter</Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto z-50" style={{ viewTransitionName: 'filter-panel' }}>
                <FilterPanel 
                selectedColors={selectedColors}
                selectedSizes={selectedSizes}
                onColorChange={handleColorChange}
                onSizeChange={handleSizeChange}
                onPriceChange={handlePriceChange}
              />
              </PopoverContent>
            </Popover>
            <ActiveFilterPills 
              selectedColors={selectedColors}
              selectedSizes={selectedSizes}
              priceRange={priceRange}
              onClearColor={handleClearColor}
              onClearSize={handleClearSize}
              onClearPrice={handleClearPrice}
            />
          </div>
          <SortDropdown onSortChange={handleSortChange} defaultValue={sortOrder} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}