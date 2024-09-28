import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartData,
  ChartDataset,
  ChartOptions,
  ChartType,
  Point,
  registerables,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';
import {
  LINE_CHART_DATA,
  LINES_CHART_OPTIONS,
} from '@common/components/fin-man-charts/fin-man-charts-configuration.const';
import { setGradientBackground } from '@common/components/fin-man-charts/fin-man-charts-set-gradients.utils';

@Component({
  selector: 'fin-man-charts',
  templateUrl: './fin-man-charts.component.html',
  styleUrls: ['./fin-man-charts.scss'],
})
export class FinManChartsComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective; // Umożliwia dostęp do wykresu

  @Input() dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [];

  chartColorType?: ChartsColorType;

  lineChartOptions: ChartOptions = LINES_CHART_OPTIONS;

  // Dane wykresu
  lineChartData: ChartData<'line'> = LINE_CHART_DATA;

  // Typ wykresu
  lineChartType: ChartType = 'line';

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.lineChartData.datasets = this.dataSets;
  }

  ngAfterViewInit(): void {
    // Set gradient when there is only one dataset
    if (this.lineChartData.datasets.length === 1) {
      this.chartColorType = this.dataSets[0].borderColor as ChartsColorType;
      this.setGradientBackground(this.chartColorType);
    }
  }

  private setGradientBackground(charTypeColor: ChartsColorType): void {
    const gradient = setGradientBackground(this.chart, charTypeColor);
    console.log(gradient);

    if (gradient) {
      this.lineChartData.datasets[0].backgroundColor = gradient;

      this.chart.update();
    }
  }
}
