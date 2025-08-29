import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colorOptions } from "@/data/variants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sizeOptions = ["S", "M", "L", "XL"];

export function FilterPanel() {
  return (
    <div className="p-4 space-y-6 w-[300px]">
      <div className="space-y-4">
        <h4 className="font-medium">Color</h4>
        <ToggleGroup type="multiple" className="flex-wrap justify-start gap-2">
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
        <ToggleGroup type="multiple" className="justify-start gap-x-2">
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
            <Input type="number" placeholder="From" aria-label="Minimum price" className="pl-7" />
          </div>
          <span>-</span>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">£</span>
            <Input type="number" placeholder="To" aria-label="Maximum price" className="pl-7" />
          </div>
        </div>
      </div>
    </div>
  );
}