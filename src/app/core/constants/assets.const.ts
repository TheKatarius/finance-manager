import { AssetTypes } from '@app/core/interfaces/asset.schema';

export const AssetTypeMap: { [key in AssetTypes]: string } = {
  [AssetTypes.Stock]: 'Akcje',
  [AssetTypes.Bonds]: 'Obligacje',
  [AssetTypes.ETF]: 'ETF',
  [AssetTypes.Cryptocurrency]: 'Kryptowaluty',
};
