import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransactionService } from './shared/transaction.service';
import { MatDialogModule } from '@angular/material';
import { cold } from 'jasmine-marbles';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            newTransaction$: cold('a', {a: true}),
            getAccount: () => cold('a-b', {
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
              },
              b: {
                name: 'KK',
                accounts: [
                  {
                    id: 'test1',
                    name: 'account1',
                    amount: 150
                  },
                  {
                    id: 'test2',
                    name: 'account2',
                    amount: 100
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
