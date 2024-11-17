import {
  ExpenseCategoryBudgeting,
  ExpenseCategorySpent,
  ExtendedExpenseCategoryBudgeting,
  ExtendedExpenseCategorySpent,
} from '@app/core/interfaces/budgeting.schema';
import { ExpenseCategoryNames } from '@app/core/interfaces/category-names.schema';

export function categoryBudgetData(
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
        category: ExpenseCategoryNames.Other2,
        budget: 0,
        spent: 0,
        budgetPercent: 0,
        spentPercent: 0,
      },
    );

  displayedExtendedCategories.push(mergedOtherExtendedCategory);

  return displayedExtendedCategories;
}

export function categorySpentData(
  categories: ExpenseCategorySpent[],
): ExtendedExpenseCategorySpent[] {
  console.log('categories: ', categories);

  // Obliczenie całkowitych wydatków
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  // Mapowanie kategorii do nowej struktury zawierającej tylko nazwę i wydatki
  const extendedCategories: ExtendedExpenseCategorySpent[] = categories
    .map((cat) => ({
      ...cat,
      spentPercent: (cat.spent / totalSpent) * 100,
    }))
    .map((cat) => ({
      ...cat,
      spentPercent: Math.round(cat.spentPercent * 100) / 100,
    }));

  // Filtrowanie kategorii, które stanowią co najmniej 3% całkowitych wydatków
  const displayedCategories = extendedCategories.filter(
    (cat) => (cat.spent / totalSpent) * 100 >= 3,
  );

  // Redukcja pozostałych kategorii do jednej kategorii "Inne"
  const mergedOtherCategory = extendedCategories
    .filter(
      (cat) => !displayedCategories.some((displayedCat) => displayedCat.category === cat.category),
    )
    .reduce(
      (acc, cat) => {
        acc.spent += cat.spent;
        acc.spentPercent = Math.round((acc.spent / totalSpent) * 100 * 100) / 100;

        return acc;
      },
      {
        category: ExpenseCategoryNames.Other2,
        spent: 0,
        spentPercent: 0,
      },
    );

  // Dodanie kategorii "Inne" do wyświetlanych kategorii, jeśli ma jakiekolwiek wydatki
  displayedCategories.push(mergedOtherCategory);

  return displayedCategories;
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
