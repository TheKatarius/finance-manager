import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

import { ExpenseCategoriesMockData } from '@app/core/mocks/pie-charts.mocks';
import {
  CHART_DATA,
  CHART_OPTIONS,
  PIE_CHART_TYPE,
  PieChartTypeLiteral,
} from '@common/components/fin-man-pie-chart/fin-man-pie-chart-configuration';
import { ExpenseCategoryBudgeting } from '@app/core/interfaces/budgeting.schema';

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

  categories: ExpenseCategoryBudgeting[] = ExpenseCategoriesMockData;

  pieChartType: PieChartTypeLiteral = PIE_CHART_TYPE;

  chartData!: ChartData<PieChartTypeLiteral>;

  chartOptions: ChartOptions<PieChartTypeLiteral> = CHART_OPTIONS;

  constructor() {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.chartData = CHART_DATA(this.categories, this.firstHue);
  }
}
