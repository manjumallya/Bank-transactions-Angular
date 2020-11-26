import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransactionsComponent } from './show-transactions.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSortModule, MatTableModule } from '@angular/material';
import { TransactionService } from '../shared/transaction.service';
import { cold } from 'jasmine-marbles';

describe('RecentTransactionsComponent', () => {
  let component: ShowTransactionsComponent;
  let fixture: ComponentFixture<ShowTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule
      ],
      declarations: [ShowTransactionsComponent],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getTransactions: () => cold('a', {
              a: {
                data: [
                  {
                    'amount': 82.02,
                    'merchant': 'The Tea Lounge',
                    'transactionDate': 1476933842000,
                    'transactionType': 'Card Payment'
                  },
                  {
                    'amount': 84.64,
                    'merchant': 'Texaco',
                    'transactionDate': 1476926642000,
                    'transactionType': 'Card Payment'
                  },
                  {
                    'amount': 84.76,
                    'merchant': 'The Tea Lounge',
                    'transactionDate': 1476840242000,
                    'transactionType': 'Card Payment'
                  }
                ]
              }
            })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be sorted in descending order', () => {
    component.sort.sort({id: 'amount', start: 'desc', disableClear: true});
    expect(component.transactions$).toBeObservable(cold('a', {
      a: [
        {
          'amount': 84.76,
          'merchant': 'The Tea Lounge',
          'transactionDate': 1476840242000,
          'transactionType': 'Card Payment'
        },
        {
          'amount': 84.64,
          'merchant': 'Texaco',
          'transactionDate': 1476926642000,
          'transactionType': 'Card Payment'
        },
        {
          'amount': 82.02,
          'merchant': 'The Tea Lounge',
          'transactionDate': 1476933842000,
          'transactionType': 'Card Payment'
        }
      ]
    }));
  });

  it('should be filtered on a keyword', () => {
    component.filter.setValue('texaco');
    expect(component.transactions$).toBeObservable(cold('a', {
      a: [
        {
          'amount': 84.64,
          'merchant': 'Texaco',
          'transactionDate': 1476926642000,
          'transactionType': 'Card Payment'
        }
      ]
    }));
  });
});
