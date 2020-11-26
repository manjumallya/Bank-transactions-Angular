import { Component } from '@angular/core';
import { TransactionService } from './shared/transaction.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DoTransactionComponent } from './do-transaction/do-transaction.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account$: Observable<{ name: string; amount: number; }> = this.transactionService.newTransaction$.pipe(
    switchMap(() => this.transactionService.getAccount()),
    map(({name, accounts}: IAccountData) => ({
      name, amount: accounts.reduce((acc, account: IAccount) => acc + account.amount, 0)
    }))
  );

  constructor(private transactionService: TransactionService,
              private matDialog: MatDialog) {
  }

  openAddDialog() {
    this.matDialog.open(DoTransactionComponent, {minWidth: ''});
  }
}
