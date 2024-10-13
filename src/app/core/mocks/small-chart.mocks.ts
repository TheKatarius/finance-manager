import { ChartData } from 'chart.js';

export const SmallChartMocks: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Miesiące
  datasets: [
    {
      data: [30, 50, 40, 60, 50, 70, 80, 75, 90, 100, 95, 110], // Wartości dla każdego miesiąca
      borderWidth: 2,
    },
  ],
};
