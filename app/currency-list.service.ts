import { Currencies } from './model/currencies.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {

  private currencies: Currencies = {
    'EUR': {
      currency: 'euro',
      weight: 10
    },
    'USD': {
      currency: 'dollar',
      weight: 10
    },
    'GBP': {
      currency: 'pound sterling',
      weight: 10
    },
    'AUD': {
      currency: 'australian dollar',
      weight: 9
    },
    'CHF': {
      currency: 'swiss franc',
      weight: 9
    },
    'JPY': {
      currency: 'japanese yen',
      weight: 8
    },
    'CNY': {
      currency: 'chinese yuan',
      weight: 8
    },
    'CAD': {
      currency: 'canadian dollar',
      weight: 8
    },
    'NZD': {
      currency: 'new zealand dollar',
      weight: 6
    },
    'NOK': {
      currency: 'norwegian krone',
      weight: 6
    },
    'INR': {
      currency: 'indian rupee',
      weight: 6
    }
  };

  getCurrencies(): Currencies {
    return this.currencies;
  }

  generateBaseCurrencies(currencyCodes: string[]): Currencies {
    const baseCurrencies = currencyCodes.reduce((prevValue, currentValue) => {
      if (this.currencies[currentValue]) {
        prevValue[currentValue] = this.currencies[currentValue];
      }
      return prevValue;
    }, {});
    return baseCurrencies;
  }
}
