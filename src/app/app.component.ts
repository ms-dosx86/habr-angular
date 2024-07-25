import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { LogsApiService } from "./services/logs-api.service";
import { combineLatest, map, switchMap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { FiltersComponent } from "./components/filters/filters.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "./models/product";
import { Status } from "./models/status";
import { SortModel } from "./models/sort-model";
import { Log } from "./models/log";
import { SortArrowComponent } from "./components/sort-arrow/sort-arrow.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [AsyncPipe, FiltersComponent, SortArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly api = inject(LogsApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly columns = ["date", "type", "product", "status"];

  readonly sort$ = this.route.queryParamMap.pipe(
    map((params) => params.get("sort")),
    map((sort) => sort?.split(",") ?? []),
    map(([field = "date", dir = "asc"]) => ({ field, dir }) as SortModel<Log>),
  );
  readonly refresh$ = this.route.queryParamMap.pipe(
    map((params) => params.get("refresh")),
    map((refresh) => booleanAttribute(refresh)),
  );
  readonly filters$ = this.route.queryParamMap.pipe(
    map((params) => ({
      product: (params.get("product") as Product) ?? Product.All,
      status: (params.get("status") as Status) ?? Status.All,
    })),
  );

  readonly logs$ = combineLatest([
    this.filters$,
    this.refresh$,
    this.sort$,
  ]).pipe(
    switchMap(([filters, refresh, sort]) =>
      this.api.getLogs({
        product: filters.product!,
        status: filters.status!,
        sort,
        refresh,
      }),
    ),
  );

  refreshLogs() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        refresh: true,
      },
      queryParamsHandling: "merge",
    });
  }

  sort(field: string, sortModel: SortModel<Log>) {
    const dir =
      sortModel.field === field
        ? sortModel.dir === "asc"
          ? "desc"
          : "asc"
        : "asc";
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: `${field},${dir}`,
      },
      queryParamsHandling: "merge",
    });
  }
}
