import { ChartData, ChartOptions } from 'chart.js';

import {
  ExpenseCategoryBudgeting,
  ExpenseCategorySpent,
  ExtendedExpenseCategoryBudgeting,
  ExtendedExpenseCategorySpent,
} from '@app/core/interfaces/budgeting.schema';
import {
  categoryBudgetData,
  categorySpentData,
  generateColors,
} from '@common/components/fin-man-pie-chart/fin-man-pie-chart.utils';

export const PIE_CHART_TYPE = 'pie' as const;
export type PieChartTypeLiteral = typeof PIE_CHART_TYPE;

export const CHART_DATA = (
  categories: ExpenseCategoryBudgeting[],
  firstHue: number = 0,
): ChartData<PieChartTypeLiteral> => {
  const categoriesData = categoryBudgetData(categories);

  return {
    labels: categoriesData.map((cat: ExtendedExpenseCategoryBudgeting) => cat.category),
    datasets: [
      {
        data: categoriesData.map((cat: ExtendedExpenseCategoryBudgeting) => cat.budgetPercent),
        backgroundColor: generateColors(categoriesData.length, firstHue),
        borderWidth: 0,
      },
    ],
  };
};

export const CHART_SPENT_DATA = (
  categories: ExpenseCategorySpent[],
  firstHue: number = 0,
): ChartData<PieChartTypeLiteral> => {
  const categoriesData = categorySpentData(categories);

  return {
    labels: categoriesData.map((cat: ExtendedExpenseCategorySpent) => cat.category),
    datasets: [
      {
        data: categoriesData.map((cat: ExtendedExpenseCategorySpent) => cat.spentPercent),
        backgroundColor: generateColors(categoriesData.length, firstHue),
        borderWidth: 0,
      },
    ],
  };
};

export const CHART_OPTIONS: ChartOptions<PieChartTypeLiteral> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 50, // Increase padding for better spacing
      bottom: 50,
      left: 150,
      right: 150,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels![ctx.dataIndex];
        return `${label}: ${value}%`;
      },
      color: '#fff',
      borderRadius: 4,
      padding: {
        top: 6,
        bottom: 6,
        left: 8,
        right: 8,
      },
      align: 'end', // Align outside of the slice
      anchor: 'end', // Anchor the label outside
      clamp: true, // Make sure it fits inside the canvas
      font: {
        size: 14,
        weight: 'bold',
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw || 0;
          return `Category: ${context.label}, Budget: ${value}%`;
        },
      },
      backgroundColor: 'rgba(0,0,0,0.9)',
      titleFont: { size: 16, weight: 'bold' },
      bodyFont: { size: 14 },
      padding: 10,
    },
  },
};
