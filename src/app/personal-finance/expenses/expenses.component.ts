import { Component } from '@angular/core';
import { ChartDataset, Point } from 'chart.js';

import { revenueData, revenueData2 } from '@app/core/mocks/dashboard-charts.mocks';
import { TransactionsMocks } from '@app/core/mocks/transactions.mocks';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';

@Component({
  selector: 'finance-manager-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {
  dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [
    {
      label: 'Expenses',
      data: revenueData,
      borderColor: '#ff3d3d',
      pointBackgroundColor: '#ff3d3d',
    },
    // {
    //   label: 'Income',
    //   data: revenueData2,
    //   borderColor: '#00ffaa',
    //   pointBackgroundColor: '#00ffaa',
    // },
  ];

  color: ChartsColorType = ChartsColorType.RED;

  transactions = TransactionsMocks;
}
