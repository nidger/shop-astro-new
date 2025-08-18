import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + price;
  }, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to checkout:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-4">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image.src} alt={item.title} width={64} height={64} className="rounded-md" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4">
            <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Checkout'}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => clearCart()}>Clear Cart</Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}