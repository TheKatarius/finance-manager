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
