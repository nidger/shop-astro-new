import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const sortOptions = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A to Z',
  'name-desc': 'Name: Z to A',
};

export type SortOption = keyof typeof sortOptions;

export function SortDropdown({ onSortChange, defaultValue }: { onSortChange: (value: SortOption) => void, defaultValue: SortOption }) {
  return (
    <Select onValueChange={onSortChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(sortOptions).map(([key, value]) => (
          <SelectItem key={key} value={key}>{value}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}