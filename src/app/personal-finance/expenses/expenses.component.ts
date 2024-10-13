import { Component } from '@angular/core';

@Component({
  selector: 'finance-manager-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['../../../css/components/personal-finance/expenses/expenses.scss'],
})
export class ExpensesComponent {
  isModalVisible: boolean = false;

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
