import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import type { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { QuantityInput } from './QuantityInput';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Product = (typeof allProducts)[0];

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product, quantity, selectedSize, selectedColor);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  
  let buttonText = "Add to Cart";
  if (hasColors && !selectedColor) {
    buttonText = "Pick a Colour";
  } else if (hasSizes && !selectedSize) {
    buttonText = "Pick a Size";
  }

  return (
    <div className="flex flex-col gap-6">
      {hasColors && (
        <div className="flex flex-col gap-2">
          <p id="color-group-label" className="text-sm font-medium text-muted-foreground">Color</p>
          <ToggleGroup 
            type="single" 
            aria-labelledby="color-group-label"
            onValueChange={(value) => setSelectedColor(value)}
            className="justify-start gap-x-2"
          >
            {product.colors.map((color) => (
              <ToggleGroupItem key={color} value={color} className="h-8 w-8 rounded-full border-2 border-border data-[state=on]:ring-2 data-[state=on]:ring-ring data-[state=on]:ring-offset-2" style={{ backgroundColor: color }} aria-label={color} />
            ))}
          </ToggleGroup>
        </div>
      )}
      {hasSizes && (
        <div className="flex flex-col gap-2">
          <p id="size-group-label" className="text-sm font-medium text-muted-foreground">Size</p>
          <ToggleGroup 
            type="single" 
            aria-labelledby="size-group-label"
            onValueChange={(value) => setSelectedSize(value)}
            className="justify-start gap-x-2"
          >
            {product.sizes.map((size) => (
              <ToggleGroupItem key={size} value={size} variant="outline" className="px-4">
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Quantity</p>
        <QuantityInput initialQuantity={1} onQuantityChange={setQuantity} />
      </div>
      <Button onClick={handleAddToCart} disabled={loading || (hasSizes && !selectedSize) || (hasColors && !selectedColor)} loading={loading} size="lg" fullWidth>
        {buttonText}
      </Button>
    </div>
  );
}