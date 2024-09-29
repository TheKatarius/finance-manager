import { Component, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { CategoriesMockData } from '@app/core/mocks/pie-charts.mocks';
import {
  PIE_CHART_TYPE,
  PieChartTypeLiteral,
  POLAR_AREA_CHART_TYPE,
  PolarAreaChartTypeLiteral,
} from '@common/components/fin-man-pie-chart/fin-man-pie-chart-configuration';
import {
  ExtendedPieChartCategory,
  PieChartCategory,
} from '@app/core/interfaces/pie-chart-category.schema';

@Component({
  selector: 'fin-man-pie-chart',
  templateUrl: './fin-man-pie-chart.component.html',
  styleUrls: ['./fin-man-pie-chart.scss'],
})
export class FinManPieChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  // Dane kategorii
  categories: PieChartCategory[] = CategoriesMockData;

  polarAreaChartType: PolarAreaChartTypeLiteral = POLAR_AREA_CHART_TYPE;

  pieChartType: PieChartTypeLiteral = PIE_CHART_TYPE;

  constructor() {
    Chart.register(...registerables);
  }

  // Dane dla wykresu polarArea (budżet)
  public outerChartData: ChartData<PolarAreaChartTypeLiteral> = {
    labels: this.categoryData.map((cat) => cat.category),
    datasets: [
      {
        data: this.categoryData.map((cat) => cat.spentPercent),
        backgroundColor: this.generateColors(this.categoryData.length),
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  public polarAreaChartOptions: ChartOptions<PolarAreaChartTypeLiteral> = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(255,255,255, 0.1)', // Szare okręgi z przezroczystością
          circular: true, // Ustawienie okręgów zamiast linii prostych
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.2)', // Ustawienie dla promieni z centrum
        },
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  // Obliczanie procentów na podstawie budżetu i wydatków
  get categoryData() {
    const totalBudget = this.categories.reduce((sum, cat) => sum + cat.budget, 0);

    const extendedCategories: ExtendedPieChartCategory[] = this.categories
      .map((cat) => ({
        ...cat,
        budgetPercent: (cat.budget / totalBudget) * 100,
        spentPercent: (cat.spent / cat.budget) * 100,
      }))
      .map((cat) => ({
        ...cat,
        spentPercent: Math.round(cat.spentPercent * 100) / 100,
      }));

    // Display categories which account for more than 4% of the budget
    const displayedExtendedCategories = extendedCategories.filter(
      (extendedCat) => extendedCat.budgetPercent >= 4,
    );

    const mergedOtherExtendedCategory = extendedCategories
      .filter(
        (extendedCat) =>
          !displayedExtendedCategories.some(
            (displayedExtendedCat) => displayedExtendedCat.category === extendedCat.category,
          ),
      )
      .reduce(
        (acc, cat) => {
          acc.spent += cat.spent;
          acc.budget += cat.budget;
          acc.budgetPercent = (acc.budget / totalBudget) * 100;
          acc.spentPercent = (acc.spent / acc.budget) * 100;

          return acc;
        },
        {
          category: 'Other',
          budget: 0,
          spent: 0,
          budgetPercent: 0,
          spentPercent: 0,
        },
      );

    displayedExtendedCategories.push(mergedOtherExtendedCategory);

    return displayedExtendedCategories;
  }

  // Generowanie kolorów dla kategorii
  private generateColors(count: number): string[] {
    const colors: string[] = [];
    const transparency: number = 0.8;

    for (let i = 0; i < count; i++) {
      if (i === count - 1) {
        colors.push(`hsl(0, 0%, 53%, ${transparency})`);
        break;
      }

      const hue = (i * 40) / count;
      colors.push(`hsla(${hue}, 70%, 50%, ${transparency})`);
    }
    return colors;
  }
}
