import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSize(size: string) {
  switch (size.toUpperCase()) {
    case 'S':
      return 'Small';
    case 'M':
      return 'Medium';
    case 'L':
      return 'Large';
    default:
      return size;
  }
}