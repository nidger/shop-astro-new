import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { colorOptions } from '@/data/variants';
import { formatSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { ResponsiveCartContainer } from './ResponsiveCartContainer';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((acc, item) => {
    const priceString = item.product.price || '£0';
    const price = parseFloat(priceString.substring(1));
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
        body: JSON.stringify({ items: items.map(item => ({ id: item.product.id, quantity: item.quantity, size: item.size, color: item.color })) }),
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
    <ResponsiveCartContainer open={isOpen} onOpenChange={setIsOpen} trigger={children}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Shopping Cart ({isHydrated ? totalItems : 0})</h4>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {isHydrated ? (
          <>
            <ScrollArea className="flex-grow pr-4 pl-4">
              {items.length > 0 ? (
                <div className="space-y-4 py-4">
                  {items.map((item) => {
                    const imageUrl = item.product.images && item.product.images.length > 0
                      ? item.product.images[0].src.src
                      : '/placeholder.svg';

                    return (
                      <div key={item.id} className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <img src={imageUrl} alt={item.product.title} className="h-16 w-16 object-cover rounded-md bg-muted" />
                          <div>
                            <p className="font-medium">{item.product.title}</p>
                            {(item.size || item.color) && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                {item.size && <span>{formatSize(item.size)}</span>}
                                {item.size && item.color && <span className="mx-1">/</span>}
                                {item.color && (() => {
                                  const color = colorOptions[item.color];
                                  if (!color) return null;
                                  return (
                                    <div className="flex items-center gap-1.5">
                                      <span>{color.name}</span>
                                      <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color.hex }} title={color.name} />
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                            <p className="text-sm font-medium mt-2">{item.product.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity">
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                           <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
              )}
            </ScrollArea>
            {items.length > 0 && (
              <div className="p-4 border-t mt-auto">
                <div className="w-full space-y-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <Button onClick={handleCheckout} disabled={loading} className="w-full" size="lg">
                    {loading ? 'Processing...' : 'Checkout'}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => clearCart()} size="lg">
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        )}
      </div>
    </ResponsiveCartContainer>
  );
}