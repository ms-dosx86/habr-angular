import { Injectable } from "@angular/core";
import { LogsFilter } from "../models/logs-filter";
import { Log } from "../models/log";
import { filterByProduct } from "../helpers/filter-by-product";
import { filterByStatus } from "../helpers/filter-by-status";
import { sort } from "../helpers/sort";

/**
 * This service was supposed to map DTOs into
 * our own Models but since we use the same interface
 * this service is no longer needed.
 * Just kept it for the sake of backend imitation via
 * `applyFilters` method.
 */
@Injectable({
  providedIn: "root",
})
export class LogsMapperService {
  /**
   * Ideally this should be done on server.
   */
  applyFilters(logs: Log[], _filter: LogsFilter) {
    const filteredLogs = logs
      .filter((log) => filterByProduct(log, _filter.product))
      .filter((log) => filterByStatus(log, _filter.status));
    const sortedLogs = filteredLogs.sort((a, b) => sort(a, b, _filter.sort));

    return sortedLogs;
  }
}
