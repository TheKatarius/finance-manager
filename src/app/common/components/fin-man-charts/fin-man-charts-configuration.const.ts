import { Chart, ChartData, ChartOptions, Color, LegendItem } from 'chart.js';

import { COLORS } from '@app/core/constants/colors.const';

const FONT_FAMILY: string = 'Noto Serif Kannada, sans-serif';

export const LINES_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    annotation: {
      annotations: {
        averageLine: {
          display: false,
          type: 'line',
          borderColor: COLORS.textSecondary,
          borderWidth: 2,
          borderDash: [10, 5],
          label: {
            content: 'Average',
            position: 'center',
            backgroundColor: COLORS.textSecondary,
          },
        },
      },
    },
    legend: {
      display: false,
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxHeight: 6,
        font: {
          size: 15,
          family: FONT_FAMILY,
          weight: 'bold',
        },
        padding: 5,
        generateLabels: (chart: Chart): LegendItem[] => {
          return chart.data.datasets.map((dataset) => ({
            text: dataset.label ?? '',
            fontColor: dataset.borderColor as Color,
            strokeStyle: dataset.borderColor as Color,
            fillStyle: dataset.borderColor as Color,
          }));
        },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      usePointStyle: true,
      boxHeight: 6,
      borderWidth: 6,
      titleFont: {
        size: 16,
        weight: 'bold',
        family: FONT_FAMILY,
      },
      bodyFont: {
        size: 14,
        family: FONT_FAMILY,
      },
      padding: 10,
      cornerRadius: 10,
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: COLORS.textSecondary, // Delikatne kolory etykiet osi X
        font: {
          size: 14,
          family: FONT_FAMILY,
        },
      },
    },
    y: {
      beginAtZero: true, // Zaczynamy oś Y od zera
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Lekkie linie siatki
        lineWidth: 1,
      },
      ticks: {
        maxTicksLimit: 10, // Maksymalnie 10 stopni na osi Y
        color: COLORS.textSecondary, // Kolor tekstu na osi Y
        font: {
          size: 14,
          family: FONT_FAMILY,
        },
        callback: (value: any) => `${value.toLocaleString()} zł`, // Dodaj jednostkę "zł"
      },
    },
  },
  elements: {
    line: {
      borderWidth: 5,
      fill: true,
      tension: 0.0,
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

export const LINE_CHART_DATA: ChartData<'line'> = {
  labels: [],
  datasets: [],
};
