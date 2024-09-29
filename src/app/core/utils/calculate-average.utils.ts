export function calculateAverage(data: number[]): number {
  const sum: number = data.reduce((a, b) => a + b, 0);
  return data.length ? sum / data.length : 0;
}
