import { Component, Input } from '@angular/core';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { ExtendedTransaction, Transaction } from '@app/core/interfaces/transaction.schema';

@Component({
  selector: 'fin-man-transaction-record',
  templateUrl: './fin-man-transaction-record.component.html',
  styleUrls: ['./fin-man-transaction-record.scss'],
})
export class FinManTransactionRecordComponent {
  @Input() transactions!: (Transaction | ExtendedTransaction)[];
  @Input() extendedRecord: boolean = false;
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;

  readonly CrudOperations = CrudOperations;

  isExtendedTransaction(
    transaction: Transaction | ExtendedTransaction,
  ): transaction is ExtendedTransaction {
    return this.extendedRecord;
  }
}
