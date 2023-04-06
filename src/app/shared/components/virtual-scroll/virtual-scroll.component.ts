import {ChangeDetectionStrategy, Component, Input, ViewChild} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

import {NO_DATA_TEXTS} from "./no-data";
import {CatQuoteType} from "../../../pages/dashboard/dashboard.service";

@Component({
  selector: "app-virtual-scroll",
  templateUrl: "./virtual-scroll.component.html",
  styleUrls: ['./virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport | undefined;
  @Input() dataProps: {
    fetchFn: () => void,
    catsQuotes$: BehaviorSubject<Array<CatQuoteType>>
  } | undefined;
  noDataTexts = NO_DATA_TEXTS;


  trackByIndex(index: number, {hash}: { hash: string }) {
    return hash;
  }

  fetchMoreData(index: number) {
    if (index / (this.viewport as CdkVirtualScrollViewport).getDataLength() > 0) {
      this.dataProps?.fetchFn();
    }
  }
}
