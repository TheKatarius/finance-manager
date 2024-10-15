import { Component, Input } from '@angular/core';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { PeriodTransaction } from '@app/core/interfaces/transaction.schema';

@Component({
  selector: 'fin-man-period-transaction-record',
  templateUrl: './fin-man-period-transaction-record.component.html',
  styleUrls: ['./fin-man-period-transaction-record.scss'],
})
export class FinManPeriodTransactionRecordComponent {
  @Input() transactions!: PeriodTransaction[];
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;

  readonly CrudOperations = CrudOperations;
}
