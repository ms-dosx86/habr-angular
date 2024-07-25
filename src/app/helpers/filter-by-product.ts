import { Log } from "../models/log";
import { Product } from "../models/product";

export function filterByProduct(log: Log, product: Product) {
  if (product === Product.All) {
    return true;
  }

  return log.product === product;
}
