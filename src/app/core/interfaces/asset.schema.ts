import { FormControl } from '@angular/forms';

export interface Asset {
  id: string;
  portfolioId: string; // Typ portfela
  name: string; // Nazwa assetu wpisywana ręcznie (np. dla obligacji) lub po wybraniu assetu w dropdown
  ticker: string; // Nazwa skrócona assetu
  assetTypeId: AssetTypes; // Rodzaj assetu
  couponRate: number; // Stopa kuponowa (obligacje)
  maturityDate: string | null; // Data wygaśnięcia - wykupu obligacji
  faceValue: number; // Wartość którą zwraca emitent po upływie maturity date - przeważnie jest to kwota zakupu obligacji
  dividendYield: number;
  accumulation: boolean;
  totalQuantity: number;
  averagePurchasePrice: number;
  totalInvested: number;
  currentValue: number;
  unrealizedGainLoss: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssetFormControls {
  portfolioId: FormControl<string | null>;
  name: FormControl<string | null>;
  ticker: FormControl<string | null>;
  assetTypeId: FormControl<AssetTypes | null>;
  couponRate: FormControl<number | null>;
  maturityDate: FormControl<string | null>;
  faceValue: FormControl<number | null>;
  dividendYield: FormControl<number | null>;
  accumulation: FormControl<boolean | null>;
  totalQuantity: FormControl<number | null>;
  averagePurchasePrice: FormControl<number | null>;
  totalInvested: FormControl<number | null>;
  currentValue: FormControl<number | null>;
  unrealizedGainLoss: FormControl<number | null>;
  createdAt: FormControl<string | null>;
  updatedAt: FormControl<string | null>;
}

export enum AssetTypes {
  Stock = 1,
  Bonds = 2,
  ETF = 3,
  Cryptocurrency = 4,
}
