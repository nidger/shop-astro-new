import { useState, useMemo, useEffect } from 'react';
import { flushSync } from 'react-dom';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SortDropdown, sortOptions, type SortOption } from './SortDropdown';
import { Button } from '@/components/ui/button';
import { FilterPanel } from './FilterPanel';
import { ActiveFilterPills } from './ActiveFilterPills';
import { FilterContainer } from './FilterContainer';

interface PriceRange {
  from?: number;
  to?: number;
}

export function InteractiveProductGrid({ products, title }: { products: Product[], title: string }) {
  // Applied state
  const [sortOrder, setSortOrder] = useState<SortOption>('price-asc');
  const [appliedColors, setAppliedColors] = useState<string[]>([]);
  const [appliedSizes, setAppliedSizes] = useState<string[]>([]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<PriceRange>({});

  // Pending state (for inside the filter panel)
  const [pendingColors, setPendingColors] = useState<string[]>([]);
  const [pendingSizes, setPendingSizes] = useState<string[]>([]);
  const [pendingPriceRange, setPendingPriceRange] = useState<PriceRange>({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync pending state when panel opens
  useEffect(() => {
    if (isFilterOpen) {
      setPendingColors(appliedColors);
      setPendingSizes(appliedSizes);
      setPendingPriceRange(appliedPriceRange);
    }
  }, [isFilterOpen, appliedColors, appliedSizes, appliedPriceRange]);

  const filteredAndSortedProducts = useMemo(() => {
    const getPrice = (priceString: string) => parseFloat(priceString.replace(/[^\d.-]/g, ''));

    let filtered = [...products];

    if (appliedColors.length > 0) {
      filtered = filtered.filter(p => p.colors && p.colors.some(c => appliedColors.includes(c)));
    }
    if (appliedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes && p.sizes.some(s => appliedSizes.includes(s)));
    }
    if (appliedPriceRange.from !== undefined && appliedPriceRange.from >= 0) {
      filtered = filtered.filter(p => getPrice(p.price) >= appliedPriceRange.from);
    }
    if (appliedPriceRange.to !== undefined && appliedPriceRange.to >= 0) {
      filtered = filtered.filter(p => getPrice(p.price) <= appliedPriceRange.to);
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
  }, [products, sortOrder, appliedColors, appliedSizes, appliedPriceRange]);

  const updateWithTransition = (updater: () => void) => {
    if (!document.startViewTransition) {
      updater();
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        updater();
      });
    });
  };

  const handleSortChange = (newSortOrder: SortOption) => updateWithTransition(() => setSortOrder(newSortOrder));

  const handleApplyFilters = () => {
    updateWithTransition(() => {
      setAppliedColors(pendingColors);
      setAppliedSizes(pendingSizes);
      setAppliedPriceRange(pendingPriceRange);
    });
    setIsFilterOpen(false);
  };

  const handleClearPendingFilters = () => {
    setPendingColors([]);
    setPendingSizes([]);
    setPendingPriceRange({});
  };

  const handleClearAppliedFilter = (type: 'color' | 'size' | 'price', value?: string) => {
    updateWithTransition(() => {
      if (type === 'color' && value) {
        setAppliedColors(prev => prev.filter(c => c !== value));
      } else if (type === 'size' && value) {
        setAppliedSizes(prev => prev.filter(s => s !== value));
      } else if (type === 'price') {
        setAppliedPriceRange({});
      }
    });
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
            <FilterContainer open={isFilterOpen} onOpenChange={setIsFilterOpen} trigger={<Button variant="outline">Filter</Button>}>
              <FilterPanel 
                selectedColors={pendingColors}
                selectedSizes={pendingSizes}
                onColorChange={setPendingColors}
                onSizeChange={setPendingSizes}
                onPriceChange={setPendingPriceRange}
                onApply={handleApplyFilters}
                onClear={handleClearPendingFilters}
                onClose={() => setIsFilterOpen(false)}
              />
            </FilterContainer>
            <ActiveFilterPills 
              selectedColors={appliedColors}
              selectedSizes={appliedSizes}
              priceRange={appliedPriceRange}
              onClearColor={(color) => handleClearAppliedFilter('color', color)}
              onClearSize={(size) => handleClearAppliedFilter('size', size)}
              onClearPrice={() => handleClearAppliedFilter('price')}
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