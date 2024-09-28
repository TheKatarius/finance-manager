import { Component } from '@angular/core';
import { ChartDataset, Point } from 'chart.js';

import { CHART_COLORS } from '@app/core/data/chart-colors.const';
import { savingsMockData } from '@app/core/mocks/dashboard-charts.mocks';

@Component({
  selector: 'finance-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/components/dashboard/dashboard.scss'],
})
export class DashboardComponent {
  dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [
    // {
    //   label: 'Expenses',
    //   data: expensesMockData,
    //   borderColor: '#ff3d3d',
    // },
    // {
    //   label: 'Income',
    //   data: incomeMockData,
    //   borderColor: '#00ffaa',
    // },
    {
      label: 'Savings',
      data: savingsMockData,
      borderColor: CHART_COLORS.AMBER.HEX,
    },
  ];
}
