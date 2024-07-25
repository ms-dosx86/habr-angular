import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { PRODUCTS_OPTIONS } from "../../constants/products-options";
import { STATUSES_OPTIONS } from "../../constants/statuses-options";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { Product } from "../../models/product";
import { Status } from "../../models/status";
import { FormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-filters",
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: "./filters.component.html",
  styleUrl: "./filters.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly product$ = this.route.queryParamMap.pipe(
    map((params) => (params.get("product") as Product) ?? Product.All),
  );
  readonly status$ = this.route.queryParamMap.pipe(
    map((params) => (params.get("status") as Status) ?? Status.All),
  );

  readonly products = PRODUCTS_OPTIONS;
  readonly statuses = STATUSES_OPTIONS;

  selectProduct(product: Product) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        product,
      },
      queryParamsHandling: "merge",
    });
  }

  selectStatus(status: Status) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status,
      },
      queryParamsHandling: "merge",
    });
  }
}
