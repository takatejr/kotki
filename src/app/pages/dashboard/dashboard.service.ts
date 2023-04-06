import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

interface CatQuoteResponse {
    data: string[];
}

export type CatQuoteType = {
    text: string;
    hash: string;
};

const MAX_REQ_WITHOUT_NEW_QUOTE = 50;

@Injectable({
    providedIn: "root",
})
export class DashboardService {
    catsQuotes$ = new BehaviorSubject<Array<CatQuoteType>>([]);
    requestWithoutNewQuoteCount = 0;

    private catsQuotesHashes: string[] = [];

    constructor(private http: HttpClient) {
        this.initCatsQuotes();
    }

    getQuoteCat(): void {
        // zgubiłem folder z envami :(
        this.http.get("https://meowfacts.herokuapp.com/").subscribe({
            next: (res) => {
                const response = res as CatQuoteResponse;

                if (!response?.data?.length) {
                    return;
                }

                if (this.requestWithoutNewQuoteCount > MAX_REQ_WITHOUT_NEW_QUOTE) {
                    window.stop();

                    return;
                }

                const newCatQuote = {
                    text: response.data[0],
                    hash: btoa(response.data[0]).substring(0, 10),
                };

                const isQuoteAlready = this.catsQuotesHashes.includes(newCatQuote.hash);

                if (!isQuoteAlready) {
                    this.catsQuotesHashes.push(newCatQuote.hash);
                    this.catsQuotes$.next([...this.catsQuotes$.value, newCatQuote]);
                    this.requestWithoutNewQuoteCount = 0;
                } else {
                    this.getQuoteCat();
                    this.requestWithoutNewQuoteCount++;
                }
            },
        });
    }

    private initCatsQuotes(): void {
        const initCatsQuotes = Array.from({ length: 15 }, () => () => this.getQuoteCat());
        initCatsQuotes.forEach((fn) => fn());
    }
}
