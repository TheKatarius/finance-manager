import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

import { COLORS } from '@app/core/constants/colors.const';
import { MONTHS_ORDER } from '@app/core/constants/data.const';
import { LineChartDataset, YearlyPersonalTransactions } from '@app/core/interfaces/chart.schema';
import { calculateAverage } from '@app/core/utils/calculate-average.utils';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';
import {
  LINE_CHART_DATA,
  LINES_CHART_OPTIONS,
} from '@common/components/fin-man-charts/fin-man-charts-configuration.const';
import { setGradientBackground } from '@common/components/fin-man-charts/fin-man-charts-set-gradients.utils';
import { CustomDropdownService } from '@common/components/fin-man-custom-dropdown/fin-man-custom-dropdown.service';

@Component({
  selector: 'fin-man-charts',
  templateUrl: './fin-man-charts.component.html',
  styleUrls: ['./fin-man-charts.scss', '../fin-man-custom-dropdown/fin-man-custom-dropdown.scss'],
})
export class FinManChartsComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() dataSets: LineChartDataset[] = [];
  @Input() chartData: Record<string, YearlyPersonalTransactions> = {};

  readonly COLORS = COLORS;

  private customDropdownService = inject(CustomDropdownService);

  convertedChartData: YearlyPersonalTransactions[] = [];

  borderColors!: string[];
  chartColorType?: ChartsColorType;

  directValueDifference: number[] = [];
  percentageValueDifference: number[] = [];

  lineChartOptions: ChartOptions = LINES_CHART_OPTIONS;
  lineChartData: ChartData<'line'> = LINE_CHART_DATA;
  lineChartType: ChartType = 'line';

  chartTypes: string[] = [];
  visibleDataSets: LineChartDataset[] = [];

  // Nowe zmienne dla dropdownów
  availableYears: number[] = [];
  availableMonths: string[] = [];
  selectedYear: number | null = null;
  selectedMonths: string[] = [];

  incomeData: number[] = [];
  expenseData: number[] = [];
  savingsData: number[] = [];

  sortedLabelIndices: number[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables, annotationPlugin);
  }

  ngOnInit(): void {
    this.convertedChartData = Object.values(this.chartData);

    // Inicjalizja ile i jakie wykresy będą obsługiwane
    this.chartTypes = this.dataSets.map((dataSet) => dataSet.label ?? '');

    this.lineChartData.datasets = this.dataSets;

    this.lineChartData.datasets.forEach((dataset) => {
      dataset.hidden = true;
    });
  }

  ngOnChanges(): void {
    if (this.convertedChartData && this.convertedChartData.length > 0) {
      this.initializeData();
    }
  }

  ngAfterViewInit(): void {
    if (this.convertedChartData && this.convertedChartData.length > 0) {
      this.initializeData();
    }
  }

  private initializeData(): void {
    console.log('this.chartData: ', Object.values(this.chartData));

    this.availableYears = this.convertedChartData.map((yearData) => yearData.Year);

    if (this.availableYears.length > 0) {
      this.onYearChange(this.availableYears[0]);
    }
  }

  // Obsługa wyboru roku
  onYearChange(year: number): void {
    if (year !== this.selectedYear) {
      this.customDropdownService.emitClearSelectedSubject();

      this.selectedYear = year;
      this.cdr.detectChanges();
      this.selectedMonths = []; // Resetowanie wybranego miesiąca

      // pobierz dane dla konkretnego roku
      const yearData = this.convertedChartData.find((data) => data.Year === year);
      if (yearData) {
        // Pobierz miesiące dla konkretnego roku
        this.availableMonths = this.sortMonths(Object.keys(yearData.Months));
        this.cdr.detectChanges();

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
  }

  // Obsługa wyboru miesiąca
  onMonthChange(month: string[]): void {
    this.selectedMonths = month;

    if (this.selectedYear) {
      this.generateLabelsWithWeeks();
      this.updateChart();
    }
  }

  private updateChart(): void {
    // Pobierz dane dla wybranego roku
    const yearData = this.convertedChartData.find((data) => data.Year === this.selectedYear);
    if (yearData) {
      // Resetowanie danych w zestawach
      this.lineChartData.datasets.forEach((dataset) => {
        dataset.data = [];
      });
      console.log(this.lineChartData);

      // Tymczasowe przechowywanie danych przed sortowaniem
      const tempData: { [key: string]: number[] } = {};

      // Inicjalizacja tablic dla każdego zestawu danych
      this.lineChartData.datasets.forEach((dataset) => {
        tempData[dataset.label ?? ''] = [];
      });

      // Najpierw zbieramy dane w oryginalnej kolejności
      for (const month of this.selectedMonths) {
        const foundMonth = yearData.Months?.[month];
        if (!foundMonth) continue;

        this.lineChartData.datasets.forEach((dataset) => {
          switch (dataset.label) {
            case 'Expenses':
              foundMonth.Weeks.forEach((week) => {
                tempData['Expenses'].push(Number(week.ExpenseTotal.toFixed(2)) ?? 0);
              });
              break;
            case 'Income':
              foundMonth.Weeks.forEach((week) => {
                tempData['Income'].push(Number(week.IncomeTotal.toFixed(2)) ?? 0);
              });
              break;
            case 'Savings':
              foundMonth.Weeks.forEach((week) => {
                tempData['Savings'].push(foundMonth.IncomeTotal ?? 0);
              });
              break;
          }
        });
      }

      // Teraz, na podstawie posortowanych indeksów, przypisujemy dane do zestawów
      this.lineChartData.datasets.forEach((dataset) => {
        const originalData = tempData[dataset.label ?? ''];
        const sortedData = this.sortedLabelIndices.map((index) => originalData[index] || 0);
        dataset.data = sortedData;
      });

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

  private checkIfSetGradientBackground(visibleDatasets: LineChartDataset[]): void {
    if (visibleDatasets.length === 1) {
      this.chartColorType = visibleDatasets[0].borderColor as ChartsColorType;
      this.setGradientBackground(this.chartColorType);
    } else {
      this.removeGradientBackground();
    }
  }

  private setGradientBackground(charTypeColor: ChartsColorType): void {
    const gradient = setGradientBackground(this.chart, charTypeColor);

    if (gradient) {
      const dataSetToChange = this.lineChartData.datasets.find(
        (dataset) => this.visibleDataSets[0].label === dataset.label,
      );
      if (dataSetToChange !== undefined) {
        dataSetToChange.backgroundColor = gradient;
      }
    }
  }

  private removeGradientBackground(): void {
    this.lineChartData.datasets.forEach((dataSet) => {
      dataSet.backgroundColor = undefined;
    });
  }

  private calculateDifference(data: number[]): number {
    if (data && data.length > 1) {
      const firstHalfValue = data
        .map((value, index) => (index < data.length / 2 ? value : 0))
        .filter((value) => value !== 0);
      const secondHalfValue = data
        .map((value, index) => (index >= data.length / 2 ? value : 0))
        .filter((value) => value !== 0);
      console.log('firstHalfValue: ', firstHalfValue);
      console.log('secondHalfValue: ', secondHalfValue);

      return Number(
        (calculateAverage(secondHalfValue) - calculateAverage(firstHalfValue)).toFixed(2),
      );
    }

    return 0;
  }

  // Policz różnice między pierwsza i ostatnią wartością na wykresie w procentach
  private calculatePercentageDifference(data: number[]): number {
    if (data && data.length > 1) {
      const firstHalfValue = calculateAverage(
        data
          .map((value, index) => (index < data.length / 2 ? value : 0))
          .filter((value) => value !== 0),
      );
      const secondHalfValue = calculateAverage(
        data
          .map((value, index) => (index >= data.length / 2 ? value : 0))
          .filter((value) => value !== 0),
      );

      if (firstHalfValue && secondHalfValue) {
        return Math.round(((secondHalfValue - firstHalfValue) / firstHalfValue) * 1000) / 10;
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

    // Dodaj lub zaktualizuj adnotację linii średniej
    existingAnnotations['averageLine'] = {
      ...(existingAnnotations as Record<string, AnnotationOptions>)['averageLine'],
      display: true,
      borderDash: [10, 5],
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

  private updateChartCalculations(): void {
    // Pobierz widoczne zestawy danych
    this.visibleDataSets = this.lineChartData.datasets.filter((dataset) => !dataset.hidden);

    // Aktualizuj kolory obramowania dla widocznych zestawów danych
    this.borderColors = this.visibleDataSets.map((dataset) => dataset.borderColor as string);

    // Ponowne obliczenie różnic dla widocznych zestawów danych
    this.directValueDifference = [];
    this.percentageValueDifference = [];

    this.visibleDataSets.forEach((dataset) => {
      const data: number[] = dataset.data as number[];
      const value: number = this.calculateDifference(data);
      this.directValueDifference.push(value);

      const percentageValue = this.calculatePercentageDifference(data);
      this.percentageValueDifference.push(percentageValue);
    });

    // Dodawanie lub usuwanie linii średniej i gradientu tła
    if (this.visibleDataSets.length === 1) {
      this.addAverageLine();

      // Ustaw gradient tła
      this.chartColorType = this.visibleDataSets[0].borderColor as ChartsColorType;
      this.checkIfSetGradientBackground(this.visibleDataSets);
    } else {
      this.removeAverageLine();
      this.removeGradientBackground();
    }

    // Aktualizacja wykresu
    if (this.chart && this.chart.chart) {
      this.chart.chart.update();
    }
  }

  private sortMonths(months: string[]): string[] {
    return months.sort((a, b) => {
      const indexA = MONTHS_ORDER.indexOf(a);
      const indexB = MONTHS_ORDER.indexOf(b);
      return indexA - indexB;
    });
  }

  private sortChartLabels(labels: string[]): { sortedLabels: string[]; sortIndices: number[] } {
    // Mapa nazw miesięcy na ich indeksy
    const monthMap: { [key: string]: number } = {};
    MONTHS_ORDER.forEach((month, index) => {
      monthMap[month.toLowerCase()] = index + 1; // Indeksy zaczynają się od 1
    });

    // Funkcja pomocnicza do parsowania etykiety
    const parseLabel = (label: string): { monthNumber: number; weekNumber: number } => {
      // Zakładamy, że format jest "Month - week X" lub "Month - tydzień X" w zależności od języka
      const regex = /^(.+?)\s*-\s*week\s*(\d+)$/i; // Dla angielskiego
      // Dla polskiego użyj:
      // const regex = /^(.+?)\s*-\s*tydzień\s*(\d+)$/i;

      const match = label.match(regex);
      if (!match || match.length !== 3) {
        // Jeśli format jest nieprawidłowy, przypisz minimalne wartości
        return { monthNumber: 0, weekNumber: 0 };
      }

      const monthName = match[1].trim().toLowerCase();
      const weekNumber = parseInt(match[2], 10) || 0;

      const monthNumber = monthMap[monthName] || 0;

      return { monthNumber, weekNumber };
    };

    // Tworzymy tablicę z etykietami i ich odpowiednimi wartościami
    const labeledData = labels.map((label, index) => ({
      label,
      monthNumber: parseLabel(label).monthNumber,
      weekNumber: parseLabel(label).weekNumber,
      originalIndex: index,
    }));

    // Sortowanie etykiet
    labeledData.sort((a, b) => {
      if (a.monthNumber !== b.monthNumber) {
        return a.monthNumber - b.monthNumber;
      }
      return a.weekNumber - b.weekNumber;
    });

    // Wyodrębnij posortowane etykiety i indeksy sortowania
    const sortedLabels = labeledData.map((item) => item.label);
    const sortIndices = labeledData.map((item) => item.originalIndex);

    return { sortedLabels, sortIndices };
  }

  private generateLabelsWithWeeks(): void {
    const labels: string[] = [];
    const yearData = this.convertedChartData.find((data) => data.Year === this.selectedYear);

    if (yearData) {
      this.selectedMonths.forEach((month) => {
        const monthData = yearData.Months[month];
        if (monthData && monthData.Weeks) {
          monthData.Weeks.forEach((week, index) => {
            labels.push(`${month} - Week ${index + 1}`);
          });
        }
      });
    }

    const { sortedLabels, sortIndices } = this.sortChartLabels(labels);

    this.lineChartData.labels = sortedLabels;

    // Przechowujemy indeksy sortowania do późniejszej reorganizacji danych
    this.sortedLabelIndices = sortIndices;
  }
}
