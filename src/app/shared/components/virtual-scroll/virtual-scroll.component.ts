import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

import { NO_DATA_TEXTS } from "./no-data";

export type VirtualScrollDataProps = {
    dataContainer$: BehaviorSubject<Array<any>>;
    fetchFn: ([...args]?) => void;
};

@Component({
    selector: "app-virtual-scroll",
    templateUrl: "./virtual-scroll.component.html",
    styleUrls: ["./virtual-scroll.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollComponent {
    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport | undefined;
    @Input() dataProps!: VirtualScrollDataProps;
    noDataTexts = NO_DATA_TEXTS;

    trackByIndex(index: number, { hash }: { hash: string }) {
        return hash;
    }

    fetchMoreData(index: number) {
        if (index / (this.viewport as CdkVirtualScrollViewport).getDataLength() > 0) {
            this.dataProps?.fetchFn();
        }
    }
}
