import {Component} from "@angular/core";
import {DashboardService} from "./dashboard.service";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  dataProps = {
    catsQuotes$: this.dashboardService.catsQuotes$,
    fetchFn: () => this.dashboardService.getQuoteCat()
  }

  constructor(private dashboardService: DashboardService) {
  }
}
