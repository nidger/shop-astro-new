import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export function QuantityInput({ initialQuantity = 1, onQuantityChange }: { initialQuantity?: number, onQuantityChange: (quantity: number) => void }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrease}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center">{quantity}</span>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrease}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}