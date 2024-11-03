import { ChartDataset, Point } from 'chart.js';

export interface MonthlyPersonalTransactionsData {
  month: string;
  expense: number;
  incomings: number;
  savings: number;
}

export interface YearlyPersonalTransactionsData {
  year: number;
  months: MonthlyPersonalTransactionsData[];
}

export type LineChartDataset = ChartDataset<'line', (number | Point | null)[]>;
