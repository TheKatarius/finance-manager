import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import {
  ExpenseCategoryBudgeting,
  IncomeCategoryBudgeting,
} from '@app/core/interfaces/category.schema';

// Helper function to generate random numbers within a range
function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random budget and spent values based on the category
export const ExpenseCategoriesMockData: ExpenseCategoryBudgeting[] = [
  {
    category: ExpenseCategoryNames.Children,
    budget: randomRange(100, 500),
    spent: randomRange(80, 400),
  },
  {
    category: ExpenseCategoryNames.Clothing,
    budget: randomRange(50, 300),
    spent: randomRange(30, 250),
  },
  {
    category: ExpenseCategoryNames.EatingOut,
    budget: randomRange(100, 600),
    spent: randomRange(80, 550),
  },
  {
    category: ExpenseCategoryNames.Education,
    budget: randomRange(200, 800),
    spent: randomRange(150, 700),
  },
  {
    category: ExpenseCategoryNames.Electronics,
    budget: randomRange(300, 1200),
    spent: randomRange(250, 1000),
  },
  {
    category: ExpenseCategoryNames.Entertainment,
    budget: randomRange(100, 500),
    spent: randomRange(50, 450),
  },
  {
    category: ExpenseCategoryNames.Gifts,
    budget: randomRange(20, 200),
    spent: randomRange(10, 180),
  },
  {
    category: ExpenseCategoryNames.Groceries,
    budget: randomRange(200, 1000),
    spent: randomRange(150, 950),
  },
  {
    category: ExpenseCategoryNames.Health,
    budget: randomRange(150, 700),
    spent: randomRange(100, 650),
  },
  {
    category: ExpenseCategoryNames.Hobby,
    budget: randomRange(50, 300),
    spent: randomRange(30, 250),
  },
  {
    category: ExpenseCategoryNames.Hygiene,
    budget: randomRange(20, 100),
    spent: randomRange(10, 90),
  },
  {
    category: ExpenseCategoryNames.Insurance,
    budget: randomRange(100, 500),
    spent: randomRange(100, 500),
  }, // Likely to spend full budget on insurance
  {
    category: ExpenseCategoryNames.Investments,
    budget: randomRange(500, 1500),
    spent: randomRange(400, 1300),
  },
  {
    category: ExpenseCategoryNames.Obligations,
    budget: randomRange(50, 300),
    spent: randomRange(40, 250),
  },
  {
    category: ExpenseCategoryNames.Other,
    budget: randomRange(50, 300),
    spent: randomRange(40, 250),
  },
  {
    category: ExpenseCategoryNames.Pets,
    budget: randomRange(100, 400),
    spent: randomRange(80, 350),
  },
  {
    category: ExpenseCategoryNames.Rent,
    budget: randomRange(700, 1500),
    spent: randomRange(700, 1500),
  }, // Usually exact spent equals budget for rent
  {
    category: ExpenseCategoryNames.Savings,
    budget: randomRange(300, 1200),
    spent: randomRange(250, 1100),
  },
  {
    category: ExpenseCategoryNames.Sport,
    budget: randomRange(50, 400),
    spent: randomRange(40, 350),
  },
  {
    category: ExpenseCategoryNames.Subscriptions,
    budget: randomRange(10, 100),
    spent: randomRange(10, 90),
  },
  {
    category: ExpenseCategoryNames.Taxes,
    budget: randomRange(500, 1500),
    spent: randomRange(500, 1500),
  }, // Exact spent equals budget for taxes
  {
    category: ExpenseCategoryNames.Transport,
    budget: randomRange(100, 600),
    spent: randomRange(80, 550),
  },
  {
    category: ExpenseCategoryNames.Travel,
    budget: randomRange(300, 1500),
    spent: randomRange(250, 1400),
  },
  {
    category: ExpenseCategoryNames.Utility,
    budget: randomRange(100, 500),
    spent: randomRange(80, 450),
  },
];

export const IncomeSourcesMockData: IncomeCategoryBudgeting[] = [
  {
    category: IncomeCategoryNames.Bonus,
    earned: randomRange(1000, 5000),
    plannedEarnings: randomRange(1500, 6000),
  },
  {
    category: IncomeCategoryNames.Gifts,
    earned: randomRange(200, 1500),
    plannedEarnings: randomRange(500, 1800),
  },
  {
    category: IncomeCategoryNames.InvestmentsIncome,
    earned: randomRange(500, 3000),
    plannedEarnings: randomRange(1000, 4000),
  },
  {
    category: IncomeCategoryNames.Salary,
    earned: randomRange(3000, 10000),
    plannedEarnings: randomRange(5000, 12000),
  },
  {
    category: IncomeCategoryNames.SideGig,
    earned: randomRange(500, 2500),
    plannedEarnings: randomRange(1000, 3000),
  },
];
