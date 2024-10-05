import { Component } from '@angular/core';

import { ExpenseCategoriesMockData } from '@app/core/mocks/pie-charts.mocks';

@Component({
  selector: 'finance-manager-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['../../../css/components/personal-finance/budgeting/budgeting.scss'],
})
export class BudgetingComponent {
  isModalVisible: boolean = false;

  categories = ExpenseCategoriesMockData.map((category) => category.category);

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  handleBudgetAdded(budgetData: any): void {
    // Tutaj obsłuż dodanie nowego planowanego budżetu
    console.log('Nowy planowany budżet:', budgetData);
    // Możesz np. wysłać dane do serwisu API lub zaktualizować stan aplikacji
  }
}
