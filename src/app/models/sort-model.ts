export interface SortModel<T> {
  field: keyof T;
  dir: "asc" | "desc";
}
