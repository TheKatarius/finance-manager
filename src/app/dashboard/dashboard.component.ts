import { Component } from '@angular/core';
import { ChartDataset, Point } from 'chart.js';

import { CHART_COLORS } from '@app/core/data/chart-colors.const';
import {
  ExpensesMockData,
  IncomeMockData,
  SavingsMockData,
} from '@app/core/mocks/line-charts.mocks';

@Component({
  selector: 'finance-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/components/dashboard/dashboard.scss'],
})
export class DashboardComponent {
  dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [
    // {
    //   label: 'Expenses',
    //   data: ExpensesMockData,
    //   borderColor: CHART_COLORS.RED.HEX,
    // },
    // {
    //   label: 'Income',
    //   data: IncomeMockData,
    //   borderColor: CHART_COLORS.GREEN.HEX,
    // },
    {
      label: 'Savings',
      data: SavingsMockData,
      borderColor: CHART_COLORS.AMBER.HEX,
    },
  ];
}
