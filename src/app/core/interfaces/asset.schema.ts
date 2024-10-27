export interface Asset {
  ID: string;
  PortfolioID: string;
  Name: string;
  Ticker: string;
  AssetTypeID: number;
  CouponRate: number;
  MaturityDate: string | null;
  FaceValue: number;
  DividendYield: number;
  Accumulation: boolean;
  TotalQuantity: number;
  AveragePurchasePrice: number;
  TotalInvested: number;
  CurrentValue: number;
  UnrealizedGainLoss: number;
  CreatedAt: string;
  UpdatedAt: string;
}
