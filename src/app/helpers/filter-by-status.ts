import { Log } from "../models/log";
import { Status } from "../models/status";

export function filterByStatus(log: Log, status: Status) {
  if (status === Status.All) {
    return true;
  }

  return log.status === status;
}
