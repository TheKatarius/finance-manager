export function calculateSecondsBetween(startDateStr: string, endDateStr: string): number {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Obliczenie różnicy w czasie w milisekundach
  const diffTime = endDate.getTime() - startDate.getTime();

  const diffSeconds = Math.floor(diffTime / 1000);

  return diffSeconds > 0 ? diffSeconds : 0;
}
