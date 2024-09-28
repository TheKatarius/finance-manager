import { Component } from '@angular/core';
import { ChartDataset, Point } from 'chart.js';

import {
  expensesMockData,
  incomeMockData,
  savingsMockData,
} from '@app/core/mocks/dashboard-charts.mocks';

@Component({
  selector: 'finance-manager-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {
  dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [
    {
      label: 'Expenses',
      data: expensesMockData,
      borderColor: '#ff3d3d',
    },
    {
      label: 'Income',
      data: incomeMockData,
      borderColor: '#00ffaa',
    },
    {
      label: 'Savings',
      data: savingsMockData,
      borderColor: '#02f5ff',
    },
  ];
}
