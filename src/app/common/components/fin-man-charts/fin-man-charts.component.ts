import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
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
export class FinManChartsComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() dataSets: LineChartDataset[] = [];
  @Input() chartData: YearlyPersonalTransactionsData[] = [];

  readonly COLORS = COLORS;

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
  selectedMonths: string[] = [];

  constructor() {
    Chart.register(...registerables, annotationPlugin);
  }

  ngOnInit(): void {
    // Inicjalizja ile i jakie wykresy będą obsługiwane
    this.chartTypes = this.dataSets.map((dataSet) => dataSet.label ?? '');

    // Inicjalizacja `lineChartData.datasets` z `dataSets`
    this.lineChartData.datasets = this.dataSets.map((dataSet) => ({
      label: dataSet.label,
      data: [], // Puste dane, zostaną uzupełnione później
      borderColor: dataSet.borderColor,
      backgroundColor: dataSet.backgroundColor,
    }));

    // Jeżeli dane zostały przekazane, to zainicjalizuj dane
    if (this.chartData && this.chartData.length > 0) {
      this.initializeData();
    }
  }

  ngOnChanges(): void {
    if (this.chartData && this.chartData.length > 0) {
      this.initializeData();
    }
  }

  private initializeData(): void {
    // Inicjalizacja dostępnych lat
    this.availableYears = this.chartData.map((y) => y.year);

    if (this.availableYears.length > 0) {
      // Default selected year
      this.onYearChange(this.availableYears[0]);
    }
  }

  // Obsługa wyboru roku
  onYearChange(year: number): void {
    this.selectedYear = year;
    this.selectedMonths = []; // Resetowanie wybranego miesiąca

    // pobierz dane dla konkretnego roku
    const yearData = this.chartData.find((y) => y.year === year);
    if (yearData) {
      // Pobierz miesiące dla konkretnego roku
      this.availableMonths = yearData.months.map((m) => m.month);
      if (this.availableMonths.length > 0) {
        // Domyślnie puste, tak że po zmianie roku
        this.onMonthChange([]);
      } else {
        this.clearChartData();
      }
    } else {
      this.availableMonths = [];
      this.clearChartData();
    }
  }

  // Obsługa wyboru miesiąca
  onMonthChange(month: string[]): void {
    this.selectedMonths = month;
    if (this.selectedYear) {
      this.updateChart();
    }
  }

  // Aktualizacja danych wykresu
  private updateChart(): void {
    // Pobierz dane dla wybranego roku
    const yearData = this.chartData.find((y) => y.year === this.selectedYear);
    if (yearData) {
      // const monthsData = this.availableMonths.filter((m) => this.availableMonths.includes(m.month));

      // Mapowanie danych na istniejące zestawy danych
      // for (let monthData of monthsData) {
      //   this.lineChartData.datasets.forEach((dataset) => {
      //     switch (dataset.label) {
      //       case 'Expenses':
      //         dataset.data = [monthData.expense];
      //         break;
      //       case 'Income':
      //         dataset.data = [monthData.incomings];
      //         break;
      //       case 'Savings':
      //         dataset.data = [monthData.savings];
      //         break;
      //     }
      //   });
      // }

      // Aktualizacja obliczeń
      this.updateChartCalculations();

      // Aktualizacja wykresu
      if (this.chart && this.chart.chart) {
        this.chart.chart.update();
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

  // Policz różnice między pierwsza i ostatnią wartością na wykresie w procentach
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
    const visibleDatasets = this.lineChartData.datasets.filter((dataset) => !dataset.hidden);

    if (visibleDatasets.length !== 1) return;

    const average = calculateAverage(visibleDatasets[0].data as number[]);

    // Upewnij się, że plugins i annotation są zainicjalizowane
    if (!this.lineChartOptions.plugins) {
      this.lineChartOptions.plugins = {};
    }

    if (!this.lineChartOptions.plugins.annotation) {
      this.lineChartOptions.plugins.annotation = {
        annotations: {},
      };
    }

    if (!this.lineChartOptions.plugins.annotation.annotations) {
      this.lineChartOptions.plugins.annotation.annotations = {};
    }

    const existingAnnotations = this.lineChartOptions.plugins.annotation.annotations as Record<
      string,
      AnnotationOptions
    >;

    const averageLineAnnotation: AnnotationOptions = {
      type: 'line',
      scaleID: 'y',
      value: average,
      borderColor: visibleDatasets[0].borderColor as string,
      borderWidth: 2,
      label: {
        display: true,
        content: `Average: ${average}`,
      },
    };

    // Dodaj lub zaktualizuj adnotację linii średniej
    existingAnnotations['averageLine'] = {
      ...(existingAnnotations as Record<string, AnnotationOptions>)['averageLine'],
      type: 'line',
      scaleID: 'y',
      value: average,
      borderColor: visibleDatasets[0].borderColor as string,
      borderWidth: 2,
      label: {
        display: true,
        content: `Average: ${average}`,
      },
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
      this.chart.chart.update();
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

  selectedChartTypes(selectedChartTypes: string[]): void {
    if (Array.isArray(selectedChartTypes)) {
      // Ustawienie właściwości `hidden` dla każdego datasetu
      this.lineChartData.datasets.forEach((dataset) => {
        dataset.hidden = !selectedChartTypes.includes(dataset.label ?? '');
      });

      // Aktualizacja obliczeń
      this.updateChartCalculations();

      // Aktualizacja wykresu
      if (this.chart && this.chart.chart) {
        this.chart.chart.update();
      }
    }
  }

  private updateChartCalculations(): void {
    // Pobierz widoczne zestawy danych
    const visibleDatasets = this.lineChartData.datasets.filter((dataset) => !dataset.hidden);

    // Aktualizuj kolory obramowania dla widocznych zestawów danych
    this.borderColors = visibleDatasets.map((dataset) => dataset.borderColor as string);

    // Ponowne obliczenie różnic dla widocznych zestawów danych
    this.directValueDifference = [];
    this.percentageValueDifference = [];

    visibleDatasets.forEach((dataset) => {
      const data: number[] = dataset.data as number[];
      const value: number = this.calculateDifference(data);
      this.directValueDifference.push(value);

      const percentageValue = this.calculatePercentageDifference(data);
      this.percentageValueDifference.push(percentageValue);
    });

    // Dodawanie lub usuwanie linii średniej i gradientu tła
    if (visibleDatasets.length === 1) {
      this.addAverageLine();

      // Ustaw gradient tła
      this.chartColorType = visibleDatasets[0].borderColor as ChartsColorType;
      this.checkIfSetGradientBackground();
    } else {
      this.removeAverageLine();
      this.removeGradientBackground();
    }

    // Aktualizacja wykresu
    if (this.chart && this.chart.chart) {
      this.chart.chart.update();
    }
  }
}
