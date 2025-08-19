import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus } from 'lucide-react';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const [loading, setLoading] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((acc, item) => {
    const price = parseFloat(item.product.price.substring(1));
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: items.map(item => ({ id: item.product.id, quantity: item.quantity })) }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('An error occurred during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-4">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.product.image.src} alt={item.product.title} width={64} height={64} className="rounded-md" />
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">{item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => decreaseQuantity(item.product.id)} icon={<Minus className="h-4 w-4" />} aria-label="Decrease quantity" />
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => increaseQuantity(item.product.id)} icon={<Plus className="h-4 w-4" />} aria-label="Increase quantity" />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} icon={<Trash2 className="h-4 w-4" />} aria-label="Remove item" />
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
              <Button onClick={handleCheckout} loading={loading} fullWidth size="lg">
                Checkout
              </Button>
              <Button variant="outline" fullWidth onClick={() => clearCart()} size="lg">
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}