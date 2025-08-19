import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import type { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { QuantityInput } from './QuantityInput';

type Product = (typeof allProducts)[0];

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="flex flex-col gap-4">
      <QuantityInput initialQuantity={1} onQuantityChange={setQuantity} />
      <Button onClick={handleAddToCart} loading={loading} size="lg" fullWidth>Add to Cart</Button>
    </div>
  );
}