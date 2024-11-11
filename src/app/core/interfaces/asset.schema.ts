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
  ID: string;
  PortfolioID: string; // Typ portfela
  Name: string; // Nazwa assetu wpisywana ręcznie (np. dla obligacji) lub po wybraniu assetu w dropdown
  Ticker: string; // Nazwa skrócona assetu
  AssetTypeID: number; // Rodzaj assetu
  CouponRate: number; // Stopa kuponowa (obligacje)
  MaturityDate: Date | null; // Data wygaśnięcia - wykupu obligacji
  FaceValue: number; // Wartość którą zwraca emitent po upływie maturity date - przeważnie jest to kwota zakupu obligacji
  DividendYield: number;
  Accumulation: boolean;
  TotalQuantity: number;
  AveragePurchasePrice: number;
  TotalInvested: number;
  CurrentValue: number;
  UnrealizedGainLoss: number;
  Currency: string;
  Exchange: string;
  ExchangeShort: string;
  InterestAccrued: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface AssetStockTable {
  ID: string;
  Name: string;
  Ticker: string;
  DividendYield: number;
  TotalQuantity: number;
  AveragePurchasePrice: number;
  TotalInvested: number;
  CurrentValue: number;
  UnrealizedGainLoss: number;
  ExchangeShort: string;
  Currency: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface AssetEtfTable {
  ID: string;
  Name: string;
  Ticker: string;
  Accumulation: boolean;
  TotalQuantity: number;
  AveragePurchasePrice: number;
  TotalInvested: number;
  CurrentValue: number;
  UnrealizedGainLoss: number;
  ExchangeShort: string;
  Currency: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface CreateAssetRequest {
  Name: string; // Nazwa assetu wpisywana ręcznie (np. dla obligacji) lub po wybraniu assetu w dropdown
  Ticker: string; // Nazwa skrócona assetu
  AssetTypeID: number; // Rodzaj assetu
  CouponRate: number; // Stopa kuponowa (obligacje)
  MaturityDate: Date | null; // Data wygaśnięcia - wykupu obligacji
  FaceValue: number; // Wartość którą zwraca emitent po upływie maturity date - przeważnie jest to kwota zakupu obligacji
  DividendYield: number;
  Accumulation: boolean;
  Currency: string;
  Exchange: string;
  ExchangeShort: string;
}

export interface AssetResponse {
  data: Asset[];
  message: string;
  status: string;
}

export interface VerifiedTicker {
  ID: number;
  AssetTypeID: number;
  Currency: string;
  Exchange: string;
  ExchangeShort: string;
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
  PortfolioID: FormControl<string | null>;
  Name: FormControl<string | null>;
  Ticker: FormControl<string | null>;
  AssetTypeID: FormControl<number | null>;
  CouponRate: FormControl<number | null>;
  MaturityDate: FormControl<string | null>;
  FaceValue: FormControl<number | null>;
  DividendYield: FormControl<number | null>;
  Accumulation: FormControl<boolean | null>;
  TotalQuantity: FormControl<number | null>;
  AveragePurchasePrice: FormControl<number | null>;
  TotalInvested: FormControl<number | null>;
  CurrentValue: FormControl<number | null>;
  UnrealizedGainLoss: FormControl<number | null>;
  Currency: FormControl<string | null>;
  Exchange: FormControl<string | null>;
  ExchangeShort: FormControl<string | null>;
  InterestAccrued: FormControl<number | null>;
  CreatedAt: FormControl<string | null>;
  UpdatedAt: FormControl<string | null>;
}

export interface AssetTransactionType {
  ID: number;
  Name: string;
}

export interface AssetTransaction {
  ID?: string;
  TransactionTypeID: number;
  PortfolioID: string;
  AssetID: string;
  Quantity: number;
  Price: number;
  CreatedAt: Date;
}

export interface AssetTransactionCreateRequest {
  TransactionTypeID: number;
  Quantity: number;
  Price: number;
  CreatedAt: Date;
}

export interface AssetTransactionResponse {
  data: AssetTransaction[];
  message: string;
  status: string;
}

export interface AssetTransactionFormControls {
  PortfolioID: FormControl<string | null>;
  AssetID: FormControl<string | null>;
  TransactionTypeID: FormControl<number | null>;
  Quantity: FormControl<number | null>;
  Price: FormControl<number | null>;
  CreatedAt: FormControl<Date | null>;
}
