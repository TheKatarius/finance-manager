import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';

export interface ExpenseCategoryBudgeting {
  category: ExpenseCategoryNames;
  budget: number;
  spent: number;
}

export interface ExpenseCategorySpent {
  category: string;
  spent: number;
}

export interface ExtendedExpenseCategoryBudgeting extends ExpenseCategoryBudgeting {
  budgetPercent: number;
  spentPercent: number;
}

export interface ExtendedExpenseCategorySpent extends ExpenseCategorySpent {
  spentPercent: number;
}

export interface IncomeCategoryBudgeting {
  category: IncomeCategoryNames;
  earned: number;
  plannedEarnings: number;
}
