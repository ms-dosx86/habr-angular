import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SortModel } from "../../models/sort-model";

@Component({
  selector: "app-sort-arrow",
  standalone: true,
  templateUrl: "./sort-arrow.component.html",
  styleUrl: "./sort-arrow.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortArrowComponent<T> {
  sort = input.required<SortModel<T>>();
  field = input.required<string>();
}
