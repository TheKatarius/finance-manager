import { Component, EventEmitter, Output } from '@angular/core';

import { COLORS } from '@app/core/constants/colors.const';
import { GRADIENT_PROGRESS_BARS } from '@app/core/constants/gradient-progress-bars.const';
import { Directions } from '@app/core/interfaces/common-enums.schema';
import { ExpenseCategoriesMockData, IncomeSourcesMockData } from '@app/core/mocks/pie-charts.mocks';

@Component({
  selector: 'fin-man-budget-overview-panel',
  templateUrl: './fin-man-budget-overview-panel.component.html',
  styleUrls: ['./fin-man-budget-overview-panel.component.scss'],
})
export class FinManBudgetOverviewPanelComponent {
  @Output() openModal = new EventEmitter<void>();

  readonly COLORS = COLORS;

  readonly GRADIENT_PROGRESS_BARS = GRADIENT_PROGRESS_BARS;

  readonly Directions = Directions;

  expenseCategories = ExpenseCategoriesMockData;

  incomeCategories = IncomeSourcesMockData;

  isLeftActive: boolean = true;

  setActiveTab(leftTab: boolean): void {
    this.isLeftActive = leftTab;
  }
}
