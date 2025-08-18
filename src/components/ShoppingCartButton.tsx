import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { CartSheet } from "./CartSheet";

const ShoppingCartButton = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartSheet>
      <Button variant="outline" size="sm" className="relative">
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </CartSheet>
  );
};

export default ShoppingCartButton;
