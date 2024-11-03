// assets.mock.ts
import { Asset, AssetTypes } from '@app/core/interfaces/asset.schema';

export const AssetsMocks: Asset[] = [
  // Istniejące aktywa
  {
    id: '1a2b3c4d5e6f7g8h9i0j',
    portfolioId: 'portfolio-1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    assetTypeId: AssetTypes.Stock,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 1.5,
    accumulation: false,
    totalQuantity: 31.5,
    averagePurchasePrice: 150.75,
    totalInvested: 4748.63,
    currentValue: 73.4,
    unrealizedGainLoss: -4675.23,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '2b3c4d5e6f7g8h9i0j1a',
    portfolioId: 'portfolio-1',
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    assetTypeId: AssetTypes.Stock,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 1.2,
    accumulation: false,
    totalQuantity: 20.0,
    averagePurchasePrice: 240.5,
    totalInvested: 4810.0,
    currentValue: 320.0,
    unrealizedGainLoss: -400.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '3c4d5e6f7g8h9i0j1a2b',
    portfolioId: 'portfolio-2',
    name: 'Tesla Inc.',
    ticker: 'TSLA',
    assetTypeId: AssetTypes.Stock,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 0.8,
    accumulation: false,
    totalQuantity: 10.0,
    averagePurchasePrice: 150.0,
    totalInvested: 1500.0,
    currentValue: 700.0,
    unrealizedGainLoss: -800.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '4d5e6f7g8h9i0j1a2b3c',
    portfolioId: 'portfolio-1',
    name: 'Bitcoin',
    ticker: 'BTC',
    assetTypeId: AssetTypes.Cryptocurrency,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 0,
    accumulation: false,
    totalQuantity: 1.5,
    averagePurchasePrice: 50000,
    totalInvested: 75000.0,
    currentValue: 60000.0,
    unrealizedGainLoss: -15000.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '5e6f7g8h9i0j1a2b3c4d',
    portfolioId: 'portfolio-1',
    name: 'Ethereum',
    ticker: 'ETH',
    assetTypeId: AssetTypes.Cryptocurrency,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 0,
    accumulation: false,
    totalQuantity: 10.0,
    averagePurchasePrice: 3000,
    totalInvested: 30000.0,
    currentValue: 2000.0,
    unrealizedGainLoss: -10000.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '6f7g8h9i0j1a2b3c4d5e',
    portfolioId: 'portfolio-2',
    name: 'Cardano',
    ticker: 'ADA',
    assetTypeId: AssetTypes.Cryptocurrency,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 0,
    accumulation: false,
    totalQuantity: 1000.0,
    averagePurchasePrice: 1.5,
    totalInvested: 1500.0,
    currentValue: 2.0,
    unrealizedGainLoss: 500.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '7g8h9i0j1a2b3c4d5e6f',
    portfolioId: 'portfolio-2',
    name: 'SPDR S&P 500 ETF',
    ticker: 'SPY',
    assetTypeId: AssetTypes.ETF,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 2.1,
    accumulation: false,
    totalQuantity: 50.0,
    averagePurchasePrice: 420.0,
    totalInvested: 21000.0,
    currentValue: 500.0,
    unrealizedGainLoss: 4000.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
  {
    id: '8h9i0j1a2b3c4d5e6f7g',
    portfolioId: 'portfolio-2',
    name: 'Vanguard Total',
    ticker: 'VTI',
    assetTypeId: AssetTypes.ETF,
    couponRate: 0,
    maturityDate: null,
    faceValue: 0,
    dividendYield: 1.7,
    accumulation: true,
    totalQuantity: 30.0,
    averagePurchasePrice: 220.0,
    totalInvested: 6600.0,
    currentValue: 250.0,
    unrealizedGainLoss: 900.0,
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },

  // Nowe mocki obligacji NBP
  {
    id: '9i0j1a2b3c4d5e6f7g8h',
    portfolioId: 'portfolio-3',
    name: 'Obligacja Skarbowa 2024',
    ticker: 'OBL2024',
    assetTypeId: AssetTypes.Bonds, // assetTypeId=2 dla obligacji
    couponRate: 3.5, // Stopa kuponowa 3.5%
    maturityDate: '2034-01-01T00:00:00Z', // Data wykupu 1 stycznia 2034
    faceValue: 1000, // Wartość nominalna 1000 PLN
    dividendYield: 0, // Dywidenda odpowiadająca stopie kuponowej
    accumulation: false, // Brak akumulacji
    totalQuantity: 10.0, // Ilość obligacji
    averagePurchasePrice: 100, // Średnia cena zakupu
    totalInvested: 1000.0, // Całkowita zainwestowana kwota
    currentValue: 0, // Aktualna wartość
    unrealizedGainLoss: 0.0, // Zysk/strata niezrealizowana
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '',
  },
  {
    id: '0j1a2b3c4d5e6f7g8h9i',
    portfolioId: 'portfolio-3',
    name: 'Obligacja Skarbowa 2026',
    ticker: 'OBL2026',
    assetTypeId: AssetTypes.Bonds, // assetTypeId=2 dla obligacji
    couponRate: 4.0, // Stopa kuponowa 4.0%
    maturityDate: '2026-12-31T00:00:00Z', // Data wykupu 31 grudnia 2026
    faceValue: 1000, // Wartość nominalna 1000 PLN
    dividendYield: 4.0, // Dywidenda odpowiadająca stopie kuponowej
    accumulation: false, // Brak akumulacji
    totalQuantity: 5.0, // Ilość obligacji
    averagePurchasePrice: 1000, // Średnia cena zakupu
    totalInvested: 5000.0, // Całkowita zainwestowana kwota
    currentValue: 1000.0, // Aktualna wartość
    unrealizedGainLoss: 0.0, // Zysk/strata niezrealizowana
    createdAt: '2024-10-27T15:10:20Z',
    updatedAt: '2024-10-27T15:10:20Z',
  },
];
