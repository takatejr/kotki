import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

export type CatQuoteType = {
  text: string,
  hash: string
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  catsQuotes$ = new BehaviorSubject<Array<CatQuoteType>>([])
  requestWithoutNewQuoteCount = 0;

  private catsQuotesHashes: string[] = [];


  constructor(private http: HttpClient) {
    this.initCatsQuotes()
  }

  getQuoteCat(): void {
    // zgubiłem folder z envami :(
    this.http
      .get('https://meowfacts.herokuapp.com/')
      .subscribe({
        next: (res: any) => {
          if (!res?.data?.length) {
            return;
          }

          if (this.requestWithoutNewQuoteCount > 50) {
            window.stop();

            return
          }

          const newCatQuote = {
            text: res.data[0],
            hash: btoa(res.data[0]).substring(0, 10)
          };

          const isQuoteAlready = this.catsQuotesHashes.includes(newCatQuote.hash);

          if (!isQuoteAlready) {
            this.catsQuotesHashes.push(newCatQuote.hash)
            this.catsQuotes$.next([...this.catsQuotes$.value, newCatQuote]);
            this.requestWithoutNewQuoteCount = 0;
          } else {
            this.getQuoteCat();
            this.requestWithoutNewQuoteCount++
          }
        },
        error: () => {
        }
      })
  }

  private initCatsQuotes(): void {
    const initCatsQuotes = Array.from({length: 15}, () => () => this.getQuoteCat())
    initCatsQuotes.forEach(fn => fn())
  }

}
