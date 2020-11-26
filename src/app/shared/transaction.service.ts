import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class TransactionService {

  get newTransaction$() {
    return this.newTransaction$$.asObservable();
  }

  private account$: Observable<IAccountData>;
  private transactions$: Observable<ITransactionData>;
  private newTransaction$$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) {
  }

  getAccount(): Observable<IAccountData> {
    return this.account$ || (this.account$ = this.http.get<IAccountData>(`account`).pipe(shareReplay(1)));
  }

  getTransactions(): Observable<ITransactionData> {
    return this.transactions$ || (this.transactions$ = this.http.get<ITransactionData>(`transactions`).pipe(
        map(({data}: ITransactionData) => ({
          data: data.map((item: ITransaction) => ({
            ...item,
            amount: parseFloat(String(item.amount))
          }))
        })),
        shareReplay(1))
    );
  }

  addTransaction(transaction: ITransaction, accountId: string) {
    forkJoin(
      this.transactions$,
      this.account$
    ).subscribe(([{data}, accountData]: [ITransactionData, IAccountData]) => {
      const account = accountData.accounts.find((a: IAccount) => a.id === accountId);
      if (!account) {
        return;
      }
      const delta = account.amount - transaction.amount;
      if (delta < 0) {
        return;
      }
      account.amount = delta;
      data.push({...transaction, transactionDate: new Date().getTime()});
      this.transactions$ = of({data});
      this.newTransaction$$.next(true);
    });
  }
}
