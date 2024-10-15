import { Component } from '@angular/core';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { ExtendedTransaction, PeriodTransaction } from '@app/core/interfaces/transaction.schema';
import {
  IncomeTransactionMocks,
  PeriodIncomeTransactionsMocks,
} from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'finance-manager-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['../../../css/components/personal-finance/expenses/expenses.scss'],
})
export class IncomingsComponent {
  readonly CategoryKind = CategoryKind;

  isModalVisible: boolean = false;

  transactionData: ExtendedTransaction[] = IncomeTransactionMocks;

  periodTransactionsData: PeriodTransaction[] = PeriodIncomeTransactionsMocks;

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
