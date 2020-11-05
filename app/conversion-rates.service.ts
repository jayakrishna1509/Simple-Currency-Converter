import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {ConversionRate} from './model/conversion-rate.model';
import {Observable, Subject, of, throwError} from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';
import { ExchangeRateItem } from './model/exchange-rate-item.model';

@Injectable({providedIn: 'root'})
export class ConversionRatesService {

  private baseUrl = 'https://api.exchangeratesapi.io/latest';
  private _loading: boolean;
  private loadingStatus: Subject<boolean> = new Subject<boolean>();

  private cache = {};

  constructor(private http: HttpClient) {}

  getLatestExchangeRates(
    amount: number,
    baseCurrencyCode: string,
    otherCurrencyCodes: string[]
  ): Observable <ConversionRate> {
    const url = `${this.baseUrl}?base=${baseCurrencyCode}&symbols=${otherCurrencyCodes.join(',')}`;

    let conversionRateObj: ConversionRate;

    this.startLoading();

    if (this.cache && this.cache[baseCurrencyCode]) {

      if (amount !== this.cache[baseCurrencyCode].amount) {
        conversionRateObj = new ConversionRate(
          amount,
          baseCurrencyCode,
          this.cache[baseCurrencyCode].date,
          this.cache[baseCurrencyCode].rates
        );
        return of(conversionRateObj);
      }

      return of(this.cache[baseCurrencyCode]);
    } else {

      return this.http.get(url, {observe: 'response'}).pipe(
        map((response: HttpResponse<ExchangeRateItem>) => {
          if (response.ok && response.status === 200) {
            return new ConversionRate(
              amount,
              baseCurrencyCode,
              new Date(response.body.date),
              response.body.rates
            );
          }
        }),
        tap(lastConversionRate => this.cache[baseCurrencyCode] = lastConversionRate),
        catchError((error: HttpErrorResponse, originalObs: Observable<ConversionRate>) => {
          return throwError(new Error('oops! We couldn\'t get the latest rates. Please try later.'));
        })
      );
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  getLoadingStatus() {
    return this.loadingStatus.asObservable();
  }
}
