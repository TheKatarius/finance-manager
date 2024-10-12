import { CodeValueItem } from '@app/core/interfaces/code-value.schema';

export const currencyIsoCodes: string[] = [
  'USD', // United States Dollar
  'EUR', // Euro
  'JPY', // Japanese Yen
  'GBP', // British Pound Sterling
  'AUD', // Australian Dollar
  'CAD', // Canadian Dollar
  'CHF', // Swiss Franc
  'CNY', // Chinese Yuan
  'SEK', // Swedish Krona
  'NZD', // New Zealand Dollar
  'MXN', // Mexican Peso
  'SGD', // Singapore Dollar
  'HKD', // Hong Kong Dollar
  'NOK', // Norwegian Krone
  'KRW', // South Korean Won
  'TRY', // Turkish Lira
  'INR', // Indian Rupee
  'RUB', // Russian Ruble
  'BRL', // Brazilian Real
  'ZAR', // South African Rand
  'PHP', // Philippine Peso
  'PLN', // Polish Zloty
  'IDR', // Indonesian Rupiah
  'THB', // Thai Baht
  'MYR', // Malaysian Ringgit
  'VND', // Vietnamese Dong
  'NGN', // Nigerian Naira
  'ARS', // Argentine Peso
  'DKK', // Danish Krone
  'ILS', // Israeli New Shekel
  'CLP', // Chilean Peso
  'PKR', // Pakistani Rupee
  'HUF', // Hungarian Forint
  'CZK', // Czech Koruna
  'AED', // UAE Dirham
  'COP', // Colombian Peso
  'SAR', // Saudi Riyal
  'TWD', // New Taiwan Dollar
  'EGP', // Egyptian Pound
  'BDT', // Bangladeshi Taka
  'UAH', // Ukrainian Hryvnia
  'KZT', // Kazakhstani Tenge
  'QAR', // Qatari Riyal
  'PEN', // Peruvian Sol
  'RON', // Romanian Leu
  'MAD', // Moroccan Dirham
  'DZD', // Algerian Dinar
  'KWD', // Kuwaiti Dinar
  'OMR', // Omani Rial
  'LBP', // Lebanese Pound
  'JOD', // Jordanian Dinar
  'BHD', // Bahraini Dinar
  'ISK', // Icelandic Krona
  'NPR', // Nepalese Rupee
  'BND', // Brunei Dollar
  'LKR', // Sri Lankan Rupee
  'MMK', // Myanmar Kyat
  'KES', // Kenyan Shilling
  'GHS', // Ghanaian Cedi
  'TZS', // Tanzanian Shilling
  'UGX', // Ugandan Shilling
  'MZN', // Mozambican Metical
  'XAF', // Central African CFA Franc
  'XOF', // West African CFA Franc
  'XPF', // CFP Franc
];

export const currencyNames: string[] = [
  'United States Dollar', // USD
  'Euro', // EUR
  'Japanese Yen', // JPY
  'British Pound Sterling', // GBP
  'Australian Dollar', // AUD
  'Canadian Dollar', // CAD
  'Swiss Franc', // CHF
  'Chinese Yuan', // CNY
  'Swedish Krona', // SEK
  'New Zealand Dollar', // NZD
  'Mexican Peso', // MXN
  'Singapore Dollar', // SGD
  'Hong Kong Dollar', // HKD
  'Norwegian Krone', // NOK
  'South Korean Won', // KRW
  'Turkish Lira', // TRY
  'Indian Rupee', // INR
  'Russian Ruble', // RUB
  'Brazilian Real', // BRL
  'South African Rand', // ZAR
  'Philippine Peso', // PHP
  'Polish Zloty', // PLN
  'Indonesian Rupiah', // IDR
  'Thai Baht', // THB
  'Malaysian Ringgit', // MYR
  'Vietnamese Dong', // VND
  'Nigerian Naira', // NGN
  'Argentine Peso', // ARS
  'Danish Krone', // DKK
  'Israeli New Shekel', // ILS
  'Chilean Peso', // CLP
  'Pakistani Rupee', // PKR
  'Hungarian Forint', // HUF
  'Czech Koruna', // CZK
  'UAE Dirham', // AED
  'Colombian Peso', // COP
  'Saudi Riyal', // SAR
  'New Taiwan Dollar', // TWD
  'Egyptian Pound', // EGP
  'Bangladeshi Taka', // BDT
  'Ukrainian Hryvnia', // UAH
  'Kazakhstani Tenge', // KZT
  'Qatari Riyal', // QAR
  'Peruvian Sol', // PEN
  'Romanian Leu', // RON
  'Moroccan Dirham', // MAD
  'Algerian Dinar', // DZD
  'Kuwaiti Dinar', // KWD
  'Omani Rial', // OMR
  'Lebanese Pound', // LBP
  'Jordanian Dinar', // JOD
  'Bahraini Dinar', // BHD
  'Icelandic Krona', // ISK
  'Nepalese Rupee', // NPR
  'Brunei Dollar', // BND
  'Sri Lankan Rupee', // LKR
  'Myanmar Kyat', // MMK
  'Kenyan Shilling', // KES
  'Ghanaian Cedi', // GHS
  'Tanzanian Shilling', // TZS
  'Ugandan Shilling', // UGX
  'Mozambican Metical', // MZN
  'Central African CFA Franc', // XAF
  'West African CFA Franc', // XOF
  'CFP Franc', // XPF
];

export const CurrenciesMocks: CodeValueItem[] = currencyIsoCodes.map((currencyIsoCode, index) => ({
  code: currencyIsoCode,
  value: currencyNames[index],
}));
