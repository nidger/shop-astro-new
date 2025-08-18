import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { CartSheet } from "./CartSheet";

const ShoppingCartButton = () => {
  const items = useCartStore((state) => state.items);

  return (
    <CartSheet>
      <Button variant="outline" size="sm" className="relative">
        <ShoppingCart className="h-4 w-4" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Button>
    </CartSheet>
  );
};

export default ShoppingCartButton;
