import { Component } from '@angular/core';

import { PeriodTransaction, Transaction } from '@app/core/interfaces/transaction.schema';
import { PeriodTransactionsMocks, TransactionsMocks } from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'finance-manager-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['../../../css/components/personal-finance/expenses/expenses.scss'],
})
export class ExpensesComponent {
  isModalVisible: boolean = false;

  transactionData: Transaction[] = TransactionsMocks;

  periodTransactionsData: PeriodTransaction[] = PeriodTransactionsMocks;

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
