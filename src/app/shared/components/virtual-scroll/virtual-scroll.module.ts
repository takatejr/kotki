import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VirtualScrollComponent } from "./virtual-scroll.component";
import { RouterModule } from "@angular/router";
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
    declarations: [VirtualScrollComponent],
    imports: [CommonModule, RouterModule, ScrollingModule],
    exports: [VirtualScrollComponent, ScrollingModule],
})
export class VirtualScrollModule {}
