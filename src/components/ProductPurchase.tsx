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
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product, quantity, selectedSize);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  const hasSizes = product.sizes && product.sizes.length > 0;
  const buttonText = hasSizes && !selectedSize ? "Pick a Size" : "Add to Cart";

  return (
    <div className="flex flex-col gap-6">
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
      <Button onClick={handleAddToCart} disabled={loading || (hasSizes && !selectedSize)} loading={loading} size="lg" fullWidth>
        {buttonText}
      </Button>
    </div>
  );
}