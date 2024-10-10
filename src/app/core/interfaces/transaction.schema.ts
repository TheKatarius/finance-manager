import { FormControl } from '@angular/forms';

export interface Transaction {
  name: string;
  date: string;
  amount: number;
  currencyIsoCode: string;
  category: string;
}

export interface ExtendedTransaction extends Transaction {
  currencyFullName: string;
  description: string;
  time: string;
}

export interface ExtendedTransactionFormControls {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
  amount: FormControl<number | null>;
  currencyIsoCode: FormControl<string | null>;
  category: FormControl<string | null>;
  currencyFullName: FormControl<string | null>;
  description: FormControl<string | null>;
  time: FormControl<string | null>;
}
