import { Product } from "../models/product";
import { SelectItem } from "../models/select-item";

export const PRODUCTS_OPTIONS: SelectItem[] = [
  ...Object.values(Product).map((value) => ({
    value,
    label: value,
  })),
];
