import { Log } from "./log";
import { Product } from "./product";
import { SortModel } from "./sort-model";
import { Status } from "./status";

export interface LogsFilter {
  product: Product;
  status: Status;
  sort: SortModel<Log>;
  refresh: boolean;
}
