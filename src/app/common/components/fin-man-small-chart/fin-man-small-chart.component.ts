import { Component, Input, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { COLORS } from '@app/core/constants/colors.const';
import { SmallChartMocks } from '@app/core/mocks/small-chart.mocks';

@Component({
  selector: 'fin-man-small-chart',
  templateUrl: './fin-man-small-chart.component.html',
  styleUrls: ['./fin-man-small-chart.scss'],
})
export class FinManSmallChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() chartColor: string = COLORS.textMain;

  // TODO: Set chartData from Input
  chartData!: ChartData<'line'>;

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          display: false, // Ukryj etykiety osi X
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lekkie linie siatki
          lineWidth: 1,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 5,
        fill: true,
        tension: 0.35,
      },
      point: {
        radius: 0,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartData = {
      ...SmallChartMocks,
      datasets: SmallChartMocks.datasets.map((dataSet) => ({
        ...dataSet,
        borderColor: this.chartColor,
      })),
    };
  }
}
