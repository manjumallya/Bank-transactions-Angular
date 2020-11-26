import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DoTransactionComponent } from './do-transaction.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../shared/transaction.service';
import { MatCheckboxModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';

describe('MakeTransferComponent', () => {
  let component: DoTransactionComponent;
  let fixture: ComponentFixture<DoTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatStepperModule
      ],
      declarations: [
        DoTransactionComponent
      ],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getAccount: () => cold('a', {
              a: {
                name: 'KK',
                accounts: [
                  {
                    id: 'test1',
                    name: 'account1',
                    amount: 200
                  },
                  {
                    id: 'test2',
                    name: 'account2',
                    amount: 100
                  }
                ]
              }
            }),
            getTransactions: () => cold('a'),
            addTransaction: () => null
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an account list', () => {
    expect(component.accounts$).toBeObservable(cold('a', {
      a: [
        {
          id: 'test1',
          name: 'account1',
          amount: 200
        },
        {
          id: 'test2',
          name: 'account2',
          amount: 100
        }
      ]
    }));
  });

  it('should return a certain account', () => {
    expect(component.getAccount('test1')).toBeObservable(cold('a', {
      a: {
        id: 'test1',
        name: 'account1',
        amount: 200
      }
    }));
  });
});
