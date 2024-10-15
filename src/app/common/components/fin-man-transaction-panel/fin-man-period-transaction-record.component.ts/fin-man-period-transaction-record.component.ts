import { Component, Input } from '@angular/core';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import {
  ExtendedTransaction,
  PeriodTransaction,
  Transaction,
} from '@app/core/interfaces/transaction.schema';

@Component({
  selector: 'fin-man-period-transaction-record',
  templateUrl: './fin-man-period-transaction-record.component.html',
  styleUrls: ['./fin-man-period-transaction-record.scss'],
})
export class FinManPeriodTransactionRecordComponent {
  @Input() transactions!: PeriodTransaction[];

  readonly CrudOperations = CrudOperations;

  // TODO: To remove
  ngOnInit(): void {
    this.transactions = this.transactions.map((transaction) =>
      transaction.amount > 0 ? { ...transaction, amount: -transaction.amount } : transaction,
    );
  }
}
