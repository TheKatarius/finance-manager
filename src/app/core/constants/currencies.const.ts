import { CodeValueItem } from '@app/core/interfaces/code-value.schema';

export const currencyIsoCodes: string[] = [
  'USD', // United States Dollar
  'EUR', // Euro
  'PLN', // Polish Zloty
];

export const currencyNames: string[] = [
  'United States Dollar', // USD
  'Euro', // EUR
  'Polish Zloty', // PLN
];

export const CurrenciesMocks: CodeValueItem[] = currencyIsoCodes.map((currencyIsoCode, index) => ({
  code: currencyIsoCode,
  value: currencyNames[index],
}));
