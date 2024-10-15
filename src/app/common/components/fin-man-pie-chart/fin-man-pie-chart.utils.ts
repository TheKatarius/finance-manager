import { ExpenseCategoryNames } from '@app/core/interfaces/category-names.schema';
import {
  ExtendedExpenseCategoryBudgeting,
  ExpenseCategoryBudgeting,
} from '@app/core/interfaces/category.schema';

export function categoryData(
  categories: ExpenseCategoryBudgeting[],
): ExtendedExpenseCategoryBudgeting[] {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  const extendedCategories: ExtendedExpenseCategoryBudgeting[] = categories
    .map((cat) => ({
      ...cat,
      budgetPercent: (cat.budget / totalBudget) * 100,
      spentPercent: (cat.spent / cat.budget) * 100,
    }))
    .map((cat) => ({
      ...cat,
      budgetPercent: Math.round(cat.budgetPercent * 100) / 100,
      spentPercent: Math.round(cat.spentPercent * 100) / 100,
    }));

  const displayedExtendedCategories = extendedCategories.filter(
    (extendedCat) => extendedCat.budgetPercent >= 3,
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
        acc.budgetPercent = Math.round((acc.budget / totalBudget) * 100 * 100) / 100;
        acc.spentPercent = Math.round((acc.spent / acc.budget) * 100 * 100) / 100;

        return acc;
      },
      {
        category: ExpenseCategoryNames.Other,
        budget: 0,
        spent: 0,
        budgetPercent: 0,
        spentPercent: 0,
      },
    );

  displayedExtendedCategories.push(mergedOtherExtendedCategory);

  return displayedExtendedCategories;
}

export function generateColors(count: number, firstHue: number = 0): string[] {
  const colors: string[] = [];
  const transparency: number = 0.7;

  for (let i = 0; i < count; i++) {
    if (i === count - 1) {
      colors.push(`hsl(0, 0%, 53%, ${transparency})`);
      break;
    }

    const hue = ((i + firstHue) * 50) / count;
    colors.push(`hsla(${hue}, 75%, 50%, 1)`);
  }
  return colors;
}
