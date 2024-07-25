import { Product } from "./product";
import { Status } from "./status";
import { Type } from "./type";

export interface Log {
  date: string;
  type: Type;
  product: Product;
  status: Status;
}
