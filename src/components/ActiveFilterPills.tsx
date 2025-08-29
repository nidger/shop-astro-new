import { Button } from "@/components/ui/button";
import { colorOptions } from "@/data/variants";
import { X } from 'lucide-react';

interface ActiveFilterPillsProps {
  selectedColors: string[];
  selectedSizes: string[];
  priceRange: { from?: number; to?: number };
  onClearColor: (color: string) => void;
  onClearSize: (size: string) => void;
  onClearPrice: () => void;
}

export function ActiveFilterPills({ 
  selectedColors, 
  selectedSizes, 
  priceRange, 
  onClearColor, 
  onClearSize, 
  onClearPrice 
}: ActiveFilterPillsProps) {
  const hasActiveFilters = selectedColors.length > 0 || selectedSizes.length > 0 || (priceRange.from !== undefined && priceRange.from >= 0) || (priceRange.to !== undefined && priceRange.to >= 0);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {selectedColors.map(colorKey => {
        const color = colorOptions[colorKey];
        if (!color) return null;
        return (
          <Button key={colorKey} variant="outline" className="flex items-center gap-1.5 pr-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color.hex }} />
              <span>{color.name}</span>
            </div>
            <button onClick={() => onClearColor(colorKey)} aria-label={`Remove ${color.name} filter`} className="rounded-full hover:bg-accent p-0.5">
              <X className="h-3 w-3" />
            </button>
          </Button>
        );
      })}

      {selectedSizes.map(size => (
        <Button key={size} variant="outline" className="flex items-center gap-1 pr-1.5">
          <span>Size: {size}</span>
          <button onClick={() => onClearSize(size)} aria-label={`Remove ${size} size filter`} className="rounded-full hover:bg-accent p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Button>
      ))}

      {(priceRange.from || priceRange.to) && (
        <Button variant="outline" className="flex items-center gap-1 pr-1.5">
          <span>
            Price: {priceRange.from ? `£${priceRange.from}` : ''} - {priceRange.to ? `£${priceRange.to}` : ''}
          </span>
          <button onClick={onClearPrice} aria-label="Remove price filter" className="rounded-full hover:bg-accent p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Button>
      )}
    </div>
  );
}