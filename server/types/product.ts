export type SelectionOption = {
  type: string;
  value: string;
};

export type Variant = {
  id: string;
  quantity: number;
  images: string[];
  isDiscontinued: boolean;
  priceCents: number;
  selectableOptions: SelectionOption[];
};

export type Product = {
  id: string;
  name: string;
  isDiscontinued: boolean;
  variants: Variant[];
  description: string;
  defaultImage: string;
};
