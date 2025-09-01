import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colorOptions } from "@/data/variants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X } from 'lucide-react';

const sizeOptions = ["S", "M", "L", "XL"];

interface FilterPanelProps {
  selectedColors: string[];
  selectedSizes: string[];
  onColorChange: (colors: string[]) => void;
  onSizeChange: (sizes: string[]) => void;
  onPriceChange: (price: { from?: number; to?: number }) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function FilterPanel({ 
  selectedColors,
  selectedSizes,
  onColorChange, 
  onSizeChange, 
  onPriceChange, 
  onApply,
  onClear,
  onClose
}: FilterPanelProps) {
  return (
    <div className="p-4 space-y-6 w-[300px] flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <h4 className="font-semibold">Filters</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-6 pr-4 -mr-4">
        <div className="space-y-4">
          <h4 className="font-medium">Color</h4>
          <ToggleGroup 
            type="multiple" 
            className="flex-wrap justify-start gap-2" 
            value={selectedColors}
            onValueChange={onColorChange}
          >
            {Object.entries(colorOptions).map(([key, { name, hex }]) => (
              <ToggleGroupItem 
                key={key} 
                value={key} 
                className="h-8 w-8 rounded-full border-2 border-border data-[state=on]:ring-2 data-[state=on]:ring-ring data-[state=on]:ring-offset-2" 
                style={{ backgroundColor: hex }} 
                aria-label={name} 
              />
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Size</h4>
          <ToggleGroup 
            type="multiple" 
            className="justify-start gap-x-2" 
            value={selectedSizes}
            onValueChange={onSizeChange}
          >
            {sizeOptions.map((size) => (
              <ToggleGroupItem key={size} value={size} variant="outline" className="px-4">
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Price</h4>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">£</span>
              <Input 
                type="number" 
                placeholder="From" 
                aria-label="Minimum price" 
                className="pl-7" 
                onChange={(e) => onPriceChange({ from: e.target.valueAsNumber })}
              />
            </div>
            <span>-</span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">£</span>
              <Input 
                type="number" 
                placeholder="To" 
                aria-label="Maximum price" 
                className="pl-7" 
                onChange={(e) => onPriceChange({ to: e.target.valueAsNumber })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t mt-auto flex items-center gap-x-2">
        <Button variant="outline" className="w-full" onClick={onClear}>Clear</Button>
        <Button className="w-full" onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}