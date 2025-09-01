import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface ResponsiveNavContainerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function ResponsiveNavContainer({ trigger, children, open, onOpenChange }: ResponsiveNavContainerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // On desktop, we might not want a sheet for navigation, 
  // as it's handled by the main header. We can render nothing or the trigger.
  // For this case, we assume the trigger is part of a desktop-hidden wrapper.
  // Or we can just use the Sheet for consistency if a sheet-based nav is desired on desktop too.
  // Let's stick to the pattern for now.

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="left" className="w-[300px]">{children}</SheetContent>
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
