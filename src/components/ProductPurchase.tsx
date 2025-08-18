import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import type { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { QuantityInput } from './QuantityInput';

type Product = (typeof allProducts)[0];

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <QuantityInput initialQuantity={1} onQuantityChange={setQuantity} />
      <Button onClick={handleAddToCart} size="lg">Add to Cart</Button>
    </div>
  );
}