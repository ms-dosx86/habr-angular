import { Log } from "../models/log";
import { SortModel } from "../models/sort-model";

export function sort(a: Log, b: Log, sortModel: SortModel<Log>) {
  const { field, dir } = sortModel;
  const k = dir === "asc" ? 1 : -1;
  let result = 0;

  if (a[field] < b[field]) {
    result = -1;
  }

  if (a[field] > b[field]) {
    result = 1;
  }

  return result * k;
}
