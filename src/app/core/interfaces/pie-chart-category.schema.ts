export interface PieChartCategory {
  category: string;
  budget: number;
  spent: number;
}

export interface ExtendedPieChartCategory extends PieChartCategory {
  budgetPercent: number;
  spentPercent: number;
}
