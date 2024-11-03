import { FormControl } from '@angular/forms';
import { ChartDataset, Point } from 'chart.js';
import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';

export interface Transaction {
  name: string;
  category: ExpenseCategoryNames | IncomeCategoryNames;
  amount: number;
  date: string; // In periodTransactions, it is date of next payment
  time: string;
  currencyIsoCode: string;
  currencyFullName: string;
  paymentSource: PaymentSource;
  description?: string;
}

export interface PeriodTransaction extends Transaction {
  periodTime: PeriodTimeTransaction;
}

export enum PeriodTimeTransaction {
  ONE_TIME = 'ONE_TIME',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum PaymentSource {
  CASH = 'CASH',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
}

export interface ExtendedTransactionFormControls {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  amount: FormControl<number | null>;
  currencyIsoCode: FormControl<string | null>;
  paymentType: FormControl<string | null>;
  category: FormControl<string | null>;
  description: FormControl<string | null>;
  time: FormControl<string | null>;
}
