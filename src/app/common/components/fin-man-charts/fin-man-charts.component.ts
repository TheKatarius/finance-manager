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
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

import { COLORS } from '@app/core/constants/colors.const';
import { yearsMocks } from '@app/core/mocks/dates.mocks';
import { calculateAverage } from '@app/core/utils/calculate-average.utils';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';
import {
  LINE_CHART_DATA,
  LINES_CHART_OPTIONS,
} from '@common/components/fin-man-charts/fin-man-charts-configuration.const';
import { setGradientBackground } from '@common/components/fin-man-charts/fin-man-charts-set-gradients.utils';

@Component({
  selector: 'fin-man-charts',
  templateUrl: './fin-man-charts.component.html',
  styleUrls: ['./fin-man-charts.scss', '../fin-man-custom-dropdown/fin-man-custom-dropdown.scss'],
})
export class FinManChartsComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() dataSets: ChartDataset<'line', (number | Point | null)[]>[] = [];

  readonly COLORS = COLORS;

  readonly yearsMocks = yearsMocks;

  borderColors?: string[];

  chartColorType?: ChartsColorType;

  directValueDifference: number[] = [];

  percentageValueDifference: number[] = [];

  lineChartOptions: ChartOptions = LINES_CHART_OPTIONS;

  // Dane wykresu
  lineChartData: ChartData<'line'> = LINE_CHART_DATA;

  // Typ wykresu
  lineChartType: ChartType = 'line';

  constructor() {
    Chart.register(...registerables, annotationPlugin);
  }

  ngOnInit(): void {
    this.borderColors = this.dataSets.map((dataSet) => dataSet.borderColor as string);

    this.lineChartData.datasets = this.dataSets;

    this.dataSets.map((dataSet) => {
      const data: number[] = dataSet.data as number[];
      const value: number = this.calculateDifference(data);
      this.directValueDifference.push(value);

      const percentageValue = this.calculatePercentageDifference(data);
      this.percentageValueDifference.push(percentageValue);
    });

    if (this.lineChartData.datasets.length === 1) {
      this.addAverageLine();
    }
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

    if (gradient) {
      this.lineChartData.datasets[0].backgroundColor = gradient;

      this.chart.update();
    }
  }

  private calculateDifference(data: number[]): number {
    if (data && data.length > 1) {
      const firstValue = data[0] ?? 0;
      const lastValue = data[data.length - 1] ?? 0;
      return lastValue - firstValue;
    }

    return 0;
  }

  private calculatePercentageDifference(data: number[]): number {
    if (data && data.length > 1) {
      const firstValue = data[0] ?? 0;
      const lastValue = data[data.length - 1] ?? 0;

      if (firstValue && lastValue) {
        return Math.round(((lastValue - firstValue) / firstValue) * 1000) / 10;
      }

      return 0;
    }

    return 0;
  }

  private addAverageLine(): void {
    const average = calculateAverage(this.dataSets[0].data as number[]);

    const existingAnnotations = this.lineChartOptions.plugins?.annotation?.annotations ?? {};

    const averageLineAnnotation: AnnotationOptions = {
      ...(existingAnnotations as Record<string, AnnotationOptions>)['averageLine'],
      display: true,
      yMin: average,
      yMax: average,
    };

    this.lineChartOptions.plugins!.annotation!.annotations = {
      ...this.lineChartOptions.plugins!.annotation!.annotations,
      averageLine: averageLineAnnotation,
    };
  }
}
