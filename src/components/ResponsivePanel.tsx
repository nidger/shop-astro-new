import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ResponsivePanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  desktopAs?: 'popover' | 'sheet';
  sheetSide?: 'left' | 'right';
}

export function ResponsivePanel({
  trigger,
  children,
  open,
  onOpenChange,
  desktopAs = 'sheet',
  sheetSide = 'right'
}: ResponsivePanelProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    if (desktopAs === 'popover') {
      return (
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent className="w-auto z-50" align="start">{children}</PopoverContent>
        </Popover>
      );
    }

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side={sheetSide} className="w-[400px] sm:w-[540px]">{children}</SheetContent>
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
