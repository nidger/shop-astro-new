import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShoppingCartButton = () => {
  return (
    <Button variant="outline" size="sm" className="relative">
      <ShoppingCart className="h-4 w-4" />
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
        1
      </span>
    </Button>
  );
};

export default ShoppingCartButton;
