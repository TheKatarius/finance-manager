import { BaseChartDirective } from 'ng2-charts';

import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';

export function setGradientBackground(
  chart: BaseChartDirective,
  color: ChartsColorType,
): CanvasGradient | null {
  if (chart.chart) {
    const ctx: CanvasRenderingContext2D = chart.chart.ctx;

    let rgbaColor: string;
    switch (color) {
      case ChartsColorType.BLUE:
        rgbaColor = 'rgba(2, 245, 255, 0.3)';
        break;
      case ChartsColorType.GREEN:
        rgbaColor = 'rgb(0, 255, 170, 0.3)';
        break;
      case ChartsColorType.RED:
        rgbaColor = 'rgb(255, 61, 61, 0.3)';
        break;
    }

    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, rgbaColor);
    gradient.addColorStop(1, 'rgba(0,0, 0, 0)');

    return gradient;
  }

  return null;
}
