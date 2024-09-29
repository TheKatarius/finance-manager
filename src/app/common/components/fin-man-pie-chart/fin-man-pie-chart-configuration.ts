import { ChartData, ChartOptions } from 'chart.js';

const FONT_FAMILY: string = 'Noto Serif Kannada, sans-serif';

export const POLAR_AREA_CHART_TYPE = 'polarArea' as const;
export type PolarAreaChartTypeLiteral = typeof POLAR_AREA_CHART_TYPE;

export const PIE_CHART_TYPE = 'pie' as const;
export type PieChartTypeLiteral = typeof PIE_CHART_TYPE;

// Konfiguracja opcji wykresu
export const EXPENDITURE_CHART_OPTIONS: ChartOptions<PolarAreaChartTypeLiteral> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {},
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
};

// Funkcja generująca dane do wykresu
export function generateExpenditureChartData(
  categories: any[],
  dataKey: 'budgetPercent' | 'spentPercent',
): ChartData<PolarAreaChartTypeLiteral | PieChartTypeLiteral> {
  const labels = categories.map((cat) => cat.name);
  const data = categories.map((cat) => cat[dataKey]);
  const backgroundColor = generateColors(categories.length);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };
}

// Funkcja generująca kolory
function generateColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 360) / count;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}
