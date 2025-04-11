interface FilterOption {
  value: string | number;
  label: string;
}

export interface FilterWidgetProps {
  options: FilterOption[];
  onChange: (value: any) => void;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
}
