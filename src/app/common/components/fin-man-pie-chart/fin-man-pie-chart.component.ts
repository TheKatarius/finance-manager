import { Component, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

import { ExpenseCategoryBudgeting } from '@app/core/interfaces/category.schema';
import { ExpenseCategoriesMockData } from '@app/core/mocks/pie-charts.mocks';
import {
  CHART_DATA,
  CHART_OPTIONS,
  PIE_CHART_TYPE,
  PieChartTypeLiteral,
} from '@common/components/fin-man-pie-chart/fin-man-pie-chart-configuration';

@Component({
  selector: 'fin-man-pie-chart',
  templateUrl: './fin-man-pie-chart.component.html',
  styleUrls: ['./fin-man-pie-chart.scss'],
})
export class FinManPieChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  categories: ExpenseCategoryBudgeting[] = ExpenseCategoriesMockData;

  pieChartType: PieChartTypeLiteral = PIE_CHART_TYPE;

  chartData: ChartData<PieChartTypeLiteral> = CHART_DATA(this.categories);

  chartOptions: ChartOptions<PieChartTypeLiteral> = CHART_OPTIONS;

  constructor() {
    Chart.register(...registerables, ChartDataLabels);
  }
}
