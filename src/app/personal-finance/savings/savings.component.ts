import { Component } from '@angular/core';

import { SavingGoalsMocks } from '@app/core/mocks/saving-goals.mocks';

@Component({
  selector: 'finance-manager-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['../../../css/components/personal-finance/savings/savings.scss'],
})
export class SavingsComponent {
  readonly SavingGoalsMocks = SavingGoalsMocks;

  isModalVisible: boolean = false;

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  handleSavingsAdd(savingsData: any): void {
    // Tutaj obsłuż dodanie nowego planowanego budżetu
    console.log('Nowy planowany budżet:', savingsData);
    // Możesz np. wysłać dane do serwisu API lub zaktualizować stan aplikacji
  }
}
