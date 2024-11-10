import { FormControl } from '@angular/forms';

export interface Portfolio {
  id: string;
  name: string; // Nazwa portfela
  description?: string; // Opis portfela (opcjonalny)
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioResponse {
  data: Portfolio[];
  message: string;
  status: string;
}

export interface PortfolioFormControls {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

export interface AssetType {
  id: number;
  type: string;
}

export interface AssetTypeResponse {
  data: AssetType[];
  message: string;
  status: string;
}

export interface Asset {
  id: string;
  portfolioId: string; // Typ portfela
  name: string; // Nazwa assetu wpisywana ręcznie (np. dla obligacji) lub po wybraniu assetu w dropdown
  ticker: string; // Nazwa skrócona assetu
  assetTypeId: number; // Rodzaj assetu
  couponRate: number; // Stopa kuponowa (obligacje)
  maturityDate: Date | null; // Data wygaśnięcia - wykupu obligacji
  faceValue: number; // Wartość którą zwraca emitent po upływie maturity date - przeważnie jest to kwota zakupu obligacji
  dividendYield: number;
  accumulation: boolean;
  totalQuantity: number;
  averagePurchasePrice: number;
  totalInvested: number;
  currentValue: number;
  unrealizedGainLoss: number;
  currency: string;
  exchange: string;
  interestAccrued: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifiedTicker {
  ID: number;
  AssetTypeID: number;
  Currency: string;
  Exchange: string;
  Name: string;
  Price: number;
  Symbol: string;
}

export interface VerifiedTickerResponse {
  data: VerifiedTicker[];
  message: string;
  status: string;
}

export interface AssetFormControls {
  portfolioId: FormControl<string | null>;
  name: FormControl<string | null>;
  ticker: FormControl<string | null>;
  assetTypeId: FormControl<number | null>;
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
  currency: FormControl<string | null>;
  exchange: FormControl<string | null>;
  interestAccrued: FormControl<number | null>;
  createdAt: FormControl<string | null>;
  updatedAt: FormControl<string | null>;
}
