import { Asset, AssetBondTable, AssetEtfTable, AssetStockTable } from '../interfaces/asset.schema';

export const ASSET_HEADERS: Record<number, string[]> = {
  1: [
    'Asset Name',
    'Ticker',
    'Dividend Yield',
    'Total Quantity',
    'Average Purchase Price',
    'Total Invested',
    'Current Value',
    'Unrealized Gain/Loss',
    'Exchange',
    'Created At',
    'Updated At',
  ],
  2: [
    'Asset Name',
    'Ticker',
    'Coupon Rate',
    'Face Value',
    'Maturity Date',
    'Average Purchase Price',
    'Total Quantity',
    'Total Invested',
    'Current Value',
    'Interest Accrued',
    'Unrealized Gain/Loss',
    'Created At',
    'Updated At',
  ],
  3: [
    'Asset Name',
    'Ticker',
    'Accumulation',
    'Total Quantity',
    'Average Purchase Price',
    'Total Invested',
    'Current Value',
    'Unrealized Gain/Loss',
    'Exchange',
    'Created At',
    'Updated At',
  ],
};

export function mapAssetToStockTable(asset: Asset): AssetStockTable | null {
  if (asset.AssetTypeID === 1) {
    // Sprawdzamy czy typ to "stock"
    return {
      ID: asset.ID,
      Name: asset.Name,
      Ticker: asset.Ticker,
      DividendYield: asset.DividendYield,
      TotalQuantity: asset.TotalQuantity,
      AveragePurchasePrice: asset.AveragePurchasePrice,
      TotalInvested: asset.TotalInvested,
      CurrentValue: asset.CurrentValue,
      UnrealizedGainLoss: asset.UnrealizedGainLoss,
      ExchangeShort: asset.Exchange,
      Currency: asset.Currency,
      CreatedAt: asset.CreatedAt,
      UpdatedAt: asset.UpdatedAt,
    };
  }
  return null; // Jeśli typ aktywa nie jest "stock", zwracamy null
}

export function mapAssetToBondTable(asset: Asset): AssetBondTable | null {
  if (asset.AssetTypeID === 2) {
    // Sprawdzamy czy typ to "stock"
    return {
      ID: asset.ID,
      Name: asset.Name,
      Ticker: asset.Ticker,
      CouponRate: asset.CouponRate,
      MaturityDate: asset.MaturityDate,
      FaceValue: asset.FaceValue,
      TotalQuantity: asset.TotalQuantity,
      AveragePurchasePrice: asset.AveragePurchasePrice,
      TotalInvested: asset.TotalInvested,
      CurrentValue: asset.CurrentValue,
      InterestAccrued: asset.InterestAccrued,
      UnrealizedGainLoss: asset.UnrealizedGainLoss,
      ExchangeShort: asset.Exchange,
      Currency: asset.Currency,
      CreatedAt: asset.CreatedAt,
      UpdatedAt: asset.UpdatedAt,
    };
  }
  return null; // Jeśli typ aktywa nie jest "stock", zwracamy null
}

export function mapAssetToEtfTable(asset: Asset): AssetEtfTable | null {
  if (asset.AssetTypeID === 3) {
    return {
      ID: asset.ID,
      Name: asset.Name,
      Ticker: asset.Ticker,
      Accumulation: asset.Accumulation,
      TotalQuantity: asset.TotalQuantity,
      AveragePurchasePrice: asset.AveragePurchasePrice,
      TotalInvested: asset.TotalInvested,
      CurrentValue: asset.CurrentValue,
      UnrealizedGainLoss: asset.UnrealizedGainLoss,
      ExchangeShort: asset.Exchange,
      Currency: asset.Currency,
      CreatedAt: asset.CreatedAt,
      UpdatedAt: asset.UpdatedAt,
    };
  }
  return null;
}
