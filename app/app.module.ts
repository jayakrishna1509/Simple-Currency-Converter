import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoneyComponent } from './money/money.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyListItemComponent } from './currency-list/currency-list-item/currency-list-item.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MoneyComponent,
    CurrencySelectorComponent,
    CurrencyListComponent,
    CurrencyListItemComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
