import { Component } from '@angular/core';

import { SavingGoalsMocks } from '@app/core/mocks/saving-goals.mocks';

@Component({
  selector: 'finance-manager-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['../../../css/components/personal-finance/savings/savings.scss'],
})
export class SavingsComponent {
  protected readonly SavingGoalsMocks = SavingGoalsMocks;
}
