import { ExchangeRates } from './exchange-rates.model';

export interface ExchangeRateItem {
  base: string;
  date: string;
  rates: ExchangeRates;
}
