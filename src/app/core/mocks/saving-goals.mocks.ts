import { SavingGoals } from '@app/core/interfaces/saving-goals.schema';
import { calculateSecondsBetween } from '@common/components/fin-man-saving-goal-panel/fin-man-saving-goal-panel.utils';

export const SavingGoalsMocks: SavingGoals[] = [
  {
    uuid: '1',
    name: 'Emergency Fund',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    timeLeft: calculateSecondsBetween('2024-01-01', '2024-12-31'),
    totalAmount: 10000, // 10,000 PLN
    currentAmount: 3500, // 3,500 PLN
  },
  {
    uuid: '2',
    name: 'Vacation to Hawaii',
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    timeLeft: calculateSecondsBetween('2024-03-01', '2024-09-01'),
    totalAmount: 5000, // 5,000 PLN
    currentAmount: 2000, // 2,000 PLN
  },
  {
    uuid: '3',
    name: 'New Laptop',
    startDate: '2024-04-15',
    endDate: '2024-07-15',
    timeLeft: calculateSecondsBetween('2024-04-15', '2024-07-15'),
    totalAmount: 2500, // 2,500 PLN
    currentAmount: 1000, // 1,000 PLN
  },
  {
    uuid: '4',
    name: 'Car Down Payment',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    timeLeft: calculateSecondsBetween('2023-06-01', '2024-06-01'),
    totalAmount: 15000, // 15,000 PLN
    currentAmount: 8000, // 8,000 PLN
  },
  {
    uuid: '5',
    name: 'Home Renovation',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    timeLeft: calculateSecondsBetween('2024-02-01', '2024-11-30'),
    totalAmount: 20000, // 20,000 PLN
    currentAmount: 12000, // 12,000 PLN
  },
];
