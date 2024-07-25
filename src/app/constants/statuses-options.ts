import { SelectItem } from "../models/select-item";
import { Status } from "../models/status";

export const STATUSES_OPTIONS: SelectItem[] = Object.values(Status).map(
  (value) => ({
    value,
    label: value,
  }),
);
