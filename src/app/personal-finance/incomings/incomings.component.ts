import { Component } from '@angular/core';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { PeriodTransaction, Transaction } from '@app/core/interfaces/transaction.schema';
import { PeriodTransactionsMocks, TransactionsMocks } from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'finance-manager-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['../../../css/components/personal-finance/expenses/expenses.scss'],
})
export class IncomingsComponent {
  readonly CategoryKind = CategoryKind;

  isModalVisible: boolean = false;

  transactionData: Transaction[] = TransactionsMocks.filter(
    (transaction) => transaction.amount > 0,
  );

  periodTransactionsData: PeriodTransaction[] = PeriodTransactionsMocks.filter(
    (transaction) => transaction.amount > 0,
  );

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  handleTransactionAdded(transactionData: any): void {
    // TODO: Integrate with API
  }
}
