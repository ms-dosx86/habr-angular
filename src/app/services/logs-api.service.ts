import { inject, Injectable } from "@angular/core";
import { LogsFilter } from "../models/logs-filter";
import { LogsMapperService } from "./logs-mapper.service";
import { map, of } from "rxjs";
import { MOCK_DATA } from "../constants/mock-data";
import { Log } from "../models/log";
import { REFRESH_MOCK_DATA } from "../constants/refresh-mock-data";

@Injectable({
  providedIn: "root",
})
export class LogsApiService {
  private readonly mapper = inject(LogsMapperService);

  getLogs(_filter: LogsFilter) {
    const logs = MOCK_DATA.logs;
    const refreshLogs = _filter.refresh ? REFRESH_MOCK_DATA.new_logs : [];

    return of([...logs, ...refreshLogs]).pipe(
      map((logs) => this.mapper.applyFilters(logs as Log[], _filter)),
    );
  }
}
