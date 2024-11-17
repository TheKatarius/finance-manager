import { FormControl } from '@angular/forms';

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
}

export interface CategoriesResponse {
  categories: Category[];
  message?: string;
  status: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface PaymentMethodsResponse {
  methods: PaymentMethod[];
  message?: string;
  status: string;
}

export interface PersonalTransaction {
  id?: string;
  user_id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  description?: string;
  predefined_category_id: number;
  user_category_id: number;
  payment_method_id: number;
}

export interface PersonalTransactionRequest {
  name?: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  predefined_category_id: number;
  payment_method_id: number;
}

export interface PersonalTransactionsResponse {
  data: PersonalTransaction[];
  message?: string;
  status: string;
}

export enum PaymentSource {
  CASH = 'CASH',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
}

export interface PersonalTransactionFormControls {
  name: FormControl<string>;
  type: FormControl<'income' | 'expense'>;
  date: FormControl<string>;
  amount: FormControl<number>;
  payment_method_id: FormControl<number>;
  payment_source_id: FormControl<number | null>;
  predefined_category_id: FormControl<number>;
  description: FormControl<string | null>;
}
