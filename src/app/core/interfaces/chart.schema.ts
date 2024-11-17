import { ChartDataset, Point } from 'chart.js';

export interface WeeklyPersonalTransactions {
  Week: number;
  IncomeTotal: number;
  ExpenseTotal: number;
}

export interface MonthlyPersonalTransactions {
  IncomeTotal: number;
  ExpenseTotal: number;
  Weeks: WeeklyPersonalTransactions[];
}

export interface YearlyPersonalTransactions {
  Year: number;
  IncomeTotal: number;
  ExpenseTotal: number;
  Months: Record<string, MonthlyPersonalTransactions>;
}

export interface DatePersonalTransactionsSummaryResponse {
  data: Record<string, YearlyPersonalTransactions>;
  message?: string;
  status: string;
}

export type LineChartDataset = ChartDataset<'line', (number | Point | null)[]>;
