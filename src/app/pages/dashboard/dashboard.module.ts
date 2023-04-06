import {NgModule} from "@angular/core";

import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {VirtualScrollModule} from "../../shared/components/virtual-scroll/virtual-scroll.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [DashboardRoutingModule, VirtualScrollModule],
  providers: [],
})
export class DashboardModule {
}
