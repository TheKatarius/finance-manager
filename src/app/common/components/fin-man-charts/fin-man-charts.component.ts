import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

import { COLORS } from '@app/core/constants/colors.const';
import { YearsMocks } from '@app/core/mocks/dates.mocks';
import { calculateAverage } from '@app/core/utils/calculate-average.utils';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';
import {
  LINE_CHART_DATA,
  LINES_CHART_OPTIONS,
} from '@common/components/fin-man-charts/fin-man-charts-configuration.const';
import { setGradientBackground } from '@common/components/fin-man-charts/fin-man-charts-set-gradients.utils';
import { LineChartDataset } from '@app/core/interfaces/transaction.schema';
import { YearlyPersonalTransactionsData } from '@app/core/interfaces/chart.schema';

@Component({
  selector: 'fin-man-charts',
  templateUrl: './fin-man-charts.component.html',
  styleUrls: ['./fin-man-charts.scss', '../fin-man-custom-dropdown/fin-man-custom-dropdown.scss'],
})
export class FinManChartsComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() dataSets: LineChartDataset[] = [];
  @Input() chartData: YearlyPersonalTransactionsData[] = [];

  readonly COLORS = COLORS;

  readonly yearsMocks = YearsMocks;

  borderColors!: string[];
  chartColorType?: ChartsColorType;

  directValueDifference: number[] = [];
  percentageValueDifference: number[] = [];

  lineChartOptions: ChartOptions = LINES_CHART_OPTIONS;
  lineChartData: ChartData<'line'> = LINE_CHART_DATA;
  lineChartType: ChartType = 'line';

  chartTypes: string[] = [];
  selectedDataSets: LineChartDataset[] = [];

  // Nowe zmienne dla dropdownów
  availableYears: number[] = [];
  availableMonths: string[] = [];
  selectedYear: number | null = null;
  selectedMonth: string | null = null;

  constructor() {
    Chart.register(...registerables, annotationPlugin);
  }

  ngOnInit(): void {
    this.chartTypes = this.dataSets.map((dataSet) => dataSet.label ?? '');

    if (this.chartData && this.chartData.length > 0) {
      this.initializeData();
    }
  }

  ngOnChanges(): void {
    if (this.chartData && this.chartData.length > 0) {
      this.initializeData();
    }
  }

  ngAfterViewInit(): void {
    this.checkIfSetGradientBackground();
  }

  private initializeData(): void {
    // Inicjalizacja dostępnych lat
    this.availableYears = this.chartData.map((y) => y.year);
    if (this.availableYears.length > 0) {
      this.selectedYear = this.availableYears[0];
      this.onYearChange(this.selectedYear);
    }
  }

  // Obsługa wyboru roku
  onYearChange(year: number): void {
    this.selectedYear = year;
    this.selectedMonth = null; // Resetowanie wybranego miesiąca

    const yearData = this.chartData.find((y) => y.year === year);
    if (yearData) {
      this.availableMonths = yearData.months.map((m) => m.month);
      if (this.availableMonths.length > 0) {
        this.selectedMonth = this.availableMonths[0];
        this.onMonthChange(this.selectedMonth);
      } else {
        this.clearChartData();
      }
    } else {
      this.availableMonths = [];
      this.clearChartData();
    }
  }

  // Obsługa wyboru miesiąca
  onMonthChange(month: string): void {
    this.selectedMonth = month;
    if (this.selectedYear && this.selectedMonth) {
      this.updateChart();
    }
  }

  // Aktualizacja danych wykresu
  private updateChart(): void {
    const yearData = this.chartData.find((y) => y.year === this.selectedYear);
    if (yearData) {
      const monthData = yearData.months.find((m) => m.month === this.selectedMonth);
      if (monthData) {
        this.lineChartData.datasets = [
          {
            label: `${this.selectedMonth} ${this.selectedYear}`,
            data: [monthData.expense, monthData.incomings, monthData.savings],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ];

        // Obliczenia różnic
        this.directValueDifference = [monthData.expense, monthData.incomings, monthData.savings];
        this.percentageValueDifference = [
          this.calculatePercentageDifference([0, monthData.expense]),
          this.calculatePercentageDifference([0, monthData.incomings]),
          this.calculatePercentageDifference([0, monthData.savings]),
        ];

        // Dodawanie linii średniej
        this.addAverageLine();

        // Aktualizacja wykresu
        if (this.chart && this.chart.chart) {
          this.chart.chart.update();
        }
      } else {
        this.clearChartData();
      }
    } else {
      this.clearChartData();
    }
  }

  // Czyszczenie danych wykresu
  private clearChartData(): void {
    this.lineChartData.labels = [];
    this.lineChartData.datasets = [];
    this.directValueDifference = [];
    this.percentageValueDifference = [];
    this.removeAverageLine();

    if (this.chart && this.chart.chart) {
      this.chart.chart.update();
    }
  }

  private checkIfSetGradientBackground(): void {
    if (this.selectedDataSets.length === 1) {
      this.chartColorType = this.selectedDataSets[0].borderColor as ChartsColorType;
      this.setGradientBackground(this.chartColorType);
    } else {
      this.removeGradientBackground();
    }
  }

  private setGradientBackground(charTypeColor: ChartsColorType): void {
    const gradient = setGradientBackground(this.chart, charTypeColor);

    if (gradient) {
      this.lineChartData.datasets[0].backgroundColor = gradient;
    }
  }

  private removeGradientBackground(): void {
    this.lineChartData.datasets.forEach((dataSet) => {
      dataSet.backgroundColor = undefined;
    });
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
    const average = calculateAverage(this.selectedDataSets[0].data as number[]);

    // Upewnij się, że plugins i annotation są zainicjalizowane
    if (!this.lineChartOptions.plugins) {
      this.lineChartOptions.plugins = {};
    }

    if (!this.lineChartOptions.plugins.annotation) {
      this.lineChartOptions.plugins.annotation = {
        annotations: {},
      };
    }

    const existingAnnotations = this.lineChartOptions.plugins.annotation.annotations as Record<
      string,
      AnnotationOptions
    >;

    // Dodaj lub zaktualizuj adnotację linii średniej
    existingAnnotations['averageLine'] = {
      ...(existingAnnotations as Record<string, AnnotationOptions>)['averageLine'],
      display: true,
      yMin: average,
      yMax: average,
    };

    this.lineChartOptions = {
      ...this.lineChartOptions,
      plugins: {
        ...this.lineChartOptions.plugins,
        annotation: {
          ...this.lineChartOptions.plugins.annotation,
          annotations: existingAnnotations,
        },
      },
    };

    // Aktualizuj wykres
    if (this.chart && this.chart.chart) {
      this.chart.chart.options = this.lineChartOptions;
    }
  }

  private removeAverageLine(): void {
    if (
      this.lineChartOptions.plugins &&
      this.lineChartOptions.plugins.annotation &&
      this.lineChartOptions.plugins.annotation.annotations
    ) {
      const annotations = this.lineChartOptions.plugins.annotation.annotations as Record<
        string,
        AnnotationOptions
      >;

      if (annotations['averageLine']) {
        delete annotations['averageLine'];

        this.lineChartOptions = {
          ...this.lineChartOptions,
          plugins: {
            ...this.lineChartOptions.plugins,
            annotation: {
              ...this.lineChartOptions.plugins.annotation,
              annotations: { ...annotations },
            },
          },
        };

        // Aktualizuj wykres
        if (this.chart && this.chart.chart) {
          this.chart.chart.options = this.lineChartOptions;
        }
      }
    }
  }

  selectedChartTypes(selectedDataSets: string[]): void {
    if (Array.isArray(selectedDataSets)) {
      this.selectedDataSets = this.dataSets.filter((dataSet) =>
        selectedDataSets.includes(dataSet.label ?? ''),
      );

      this.lineChartData.datasets = this.selectedDataSets;

      this.updateChart();
    }
  }
}
