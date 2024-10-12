import { Component, Input } from '@angular/core';

import { ExtendedTransaction, Transaction } from '@app/core/interfaces/transaction.schema';

@Component({
  selector: 'fin-man-transaction-record',
  templateUrl: './fin-man-transaction-record.component.html',
  styleUrls: ['./fin-man-transaction-record.scss'],
})
export class FinManTransactionRecordComponent {
  @Input() transactions!: (Transaction | ExtendedTransaction)[];
  @Input() extendedRecord: boolean = false;

  // TODO: To remove
  ngOnInit(): void {
    this.transactions = this.transactions.map((transaction) =>
      transaction.amount > 0 ? { ...transaction, amount: -transaction.amount } : transaction,
    );
  }

  isExtendedTransaction(
    transaction: Transaction | ExtendedTransaction,
  ): transaction is ExtendedTransaction {
    return this.extendedRecord;
  }
}
