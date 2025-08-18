import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import type { allProducts } from '@/data/products';

type Product = (typeof allProducts)[0];

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button size="lg" className="w-full mt-6" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  );
}
