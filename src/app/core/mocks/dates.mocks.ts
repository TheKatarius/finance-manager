const currentYear = new Date().getFullYear();
const minimalYear = 2010;
export const yearsMocks: string[] = Array.from({ length: currentYear - minimalYear + 1 }, (_, i) =>
  (minimalYear + i).toString(),
);

export const monthsMocks: string[] = [
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
