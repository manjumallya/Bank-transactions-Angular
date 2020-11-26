import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DoTransactionComponent } from './do-transaction/do-transaction.component';
import { ShowTransactionsComponent } from './show-transactions/show-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    DoTransactionComponent,
    ShowTransactionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  entryComponents: [
    DoTransactionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
