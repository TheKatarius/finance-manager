import { ChartData, ChartOptions } from 'chart.js';

const FONT_FAMILY: string = 'Noto Serif Kannada, sans-serif';

export const LINES_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Money Generated In This Year',
      color: '#ffffff',
      font: {
        size: 28,
        family: FONT_FAMILY,
      },
      position: 'top',
      align: 'start',
      padding: 20,
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxHeight: 6,
        color: '#ffffff',
        font: {
          size: 14,
          family: FONT_FAMILY,
        },
        padding: 10,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        color: '#94a3b8', // Delikatne kolory etykiet osi X
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
        color: '#94a3b8', // Kolor tekstu na osi Y
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
      tension: 0.4,
      fill: true,
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
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [],
};
