import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface FilterContainerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function FilterContainer({ trigger, children, open, onOpenChange }: FilterContainerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-auto z-50">{children}</PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
