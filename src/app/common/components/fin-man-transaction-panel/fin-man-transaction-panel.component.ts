import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { PeriodTransaction, Transaction } from '@app/core/interfaces/transaction.schema';

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
  @Input() transactionData: Transaction[] = [];
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;
  @Input() isImportActive: boolean = false;

  @Output() openModal = new EventEmitter<void>();

  readonly CategoryKind = CategoryKind;

  control = new FormControl('');
}
