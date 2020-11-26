import { AfterViewInit, Component, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatVerticalStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-do-transfer',
  templateUrl: './do-transaction.component.html',
  styleUrls: ['./do-transaction.component.scss']
})
export class DoTransactionComponent implements AfterViewInit {

  accounts$: Observable<IAccount[]> = this.transactionService.newTransaction$.pipe(
    switchMap(() => this.transactionService.getAccount()),
    map(({accounts}: IAccountData) => accounts)
  );

  form: FormGroup = this.formBuilder.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]]
  }, {
    asyncValidator: ({value: {from, amount}}: FormGroup) => this.getAccount(from).pipe(
      take(1),
      map((a: IAccount) => (a.amount < amount ? {amount: true} : null))
    )
  });

  confirmation: FormControl = new FormControl(
    null, [
      Validators.required,
      (c: FormControl) => c.value ? null : {confirmation: true}
    ]
  );

  @ViewChild(MatVerticalStepper)
  stepper: MatVerticalStepper;

  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService,
              @Optional() public dialogRef: MatDialogRef<DoTransactionComponent>) {
  }

  ngAfterViewInit() {
    this.stepper.selectionChange.subscribe(({selectedIndex}: StepperSelectionEvent) => {
      if (selectedIndex !== 2) {
        return;
      }
      const {from, to, amount} = this.form.value;
      this.transactionService.addTransaction({
        amount,
        categoryCode: '#1180aa',
        merchant: to,
        merchantLogo: '',
        transactionType: 'Transaction'
      }, from);
    });
  }

  getAccount(accountId: string): Observable<IAccount> {
    return this.accounts$.pipe(
      map((accounts: IAccount[]) => accounts.find((a: IAccount) => a.id === accountId))
    );
  }
}
