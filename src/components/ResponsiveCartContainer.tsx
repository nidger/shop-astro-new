import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface ResponsiveCartContainerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function ResponsiveCartContainer({ trigger, children, open, onOpenChange }: ResponsiveCartContainerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">{children}</SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
