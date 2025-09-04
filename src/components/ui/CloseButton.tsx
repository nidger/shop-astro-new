
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export interface CloseButtonProps extends ButtonProps {}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 rounded-sm opacity-70 transition-opacity hover:opacity-100",
          className
        )}
        {...props}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    );
  }
);

CloseButton.displayName = "CloseButton";

export { CloseButton };
