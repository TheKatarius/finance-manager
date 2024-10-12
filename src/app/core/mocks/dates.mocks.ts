const currentYear = new Date().getFullYear();
const minimalYear = 2010;
export const YearsMocks: string[] = Array.from({ length: currentYear - minimalYear + 1 }, (_, i) =>
  (minimalYear + i).toString(),
);

export const MonthsMocks: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
