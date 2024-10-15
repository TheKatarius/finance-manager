import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import {
  ExtendedTransaction,
  PeriodTransaction,
  Transaction,
} from '@app/core/interfaces/transaction.schema';
import {
  ExtendedTransactionsMocks,
  PeriodTransactionsMocks,
  TransactionsMocks,
} from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'fin-man-transaction-panel',
  templateUrl: './fin-man-transaction-panel.component.html',
  styleUrls: ['./fin-man-transaction-panel.scss'],
})
export class FinManTransactionPanelComponent {
  @Input() extendedPanel: boolean = false;
  @Input() panelTitle: string = 'Transactions';
  @Input() periodTransactions: boolean = false;
  @Input() periodTransactionsData: PeriodTransaction[] = [];
  @Input() transactionData: Transaction[] | ExtendedTransaction[] = [];
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;

  @Output() openModal = new EventEmitter<void>();

  readonly CategoryKind = CategoryKind;

  control = new FormControl('');
}
