import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

import { ExpenseCategorySpent } from '@app/core/interfaces/budgeting.schema';
import { Category, PersonalTransaction } from '@app/core/interfaces/personal-transactions.schema';
import {
  CHART_OPTIONS,
  CHART_SPENT_DATA,
  PIE_CHART_TYPE,
  PieChartTypeLiteral,
} from '@common/components/fin-man-pie-chart/fin-man-pie-chart-configuration';

@Component({
  selector: 'fin-man-pie-chart',
  templateUrl: './fin-man-pie-chart.component.html',
  styleUrls: ['./fin-man-pie-chart.scss'],
})
export class FinManPieChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() smallChart: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() firstHue: number = 0;
  @Input() categories: Category[] = [];
  @Input() personalData: PersonalTransaction[] = [];

  mergedData: ExpenseCategorySpent[] = [];

  pieChartType: PieChartTypeLiteral = PIE_CHART_TYPE;

  chartData!: ChartData<PieChartTypeLiteral>;

  chartOptions: ChartOptions<PieChartTypeLiteral> = CHART_OPTIONS;

  constructor() {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    console.log('this.categories', this.categories);
    console.log('this.personalData', this.personalData);

    for (const categoryObj of this.categories) {
      const spent = this.personalData
        .filter((transaction) => transaction.predefined_category_id === categoryObj.id)
        .reduce((acc, curr) => acc + curr.amount, 0);

      this.mergedData.push({
        category: categoryObj.name,
        spent,
      });
    }

    this.chartData = CHART_SPENT_DATA(this.mergedData, this.firstHue);
  }
}
