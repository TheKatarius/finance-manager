import { BaseChartDirective } from 'ng2-charts';

import { CHART_COLORS } from '@app/core/constants/chart-colors.const';
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
        rgbaColor = CHART_COLORS.BLUE.RGBA;
        break;
      case ChartsColorType.GREEN:
        rgbaColor = CHART_COLORS.GREEN.RGBA;
        break;
      case ChartsColorType.RED:
        rgbaColor = CHART_COLORS.RED.RGBA;
        break;
      case ChartsColorType.AMBER:
        rgbaColor = CHART_COLORS.AMBER.RGBA;
        break;
      case ChartsColorType.PURPLE:
        rgbaColor = CHART_COLORS.PURPLE.RGBA;
        break;
    }

    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, rgbaColor);
    gradient.addColorStop(1, 'rgba(0,0, 0, 0)');

    return gradient;
  }

  return null;
}
