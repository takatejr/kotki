import { Component } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { VirtualScrollDataProps } from "../../shared/components/virtual-scroll/virtual-scroll.component";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
    dataProps: VirtualScrollDataProps = {
        dataContainer$: this.dashboardService.catsQuotes$,
        fetchFn: () => this.dashboardService.getQuoteCat(),
    };

    constructor(private dashboardService: DashboardService) {}
}
