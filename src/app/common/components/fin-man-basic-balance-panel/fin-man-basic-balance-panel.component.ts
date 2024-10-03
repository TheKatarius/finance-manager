import { Component } from '@angular/core';

import { GRADIENT_PROGRESS_BARS } from '@app/core/constants/gradient-progress-bars.const';

@Component({
  selector: 'fin-man-basic-balance-panel',
  templateUrl: './fin-man-basic-balance-panel.component.html',
  styleUrls: ['./fin-man-basic-balance-panel.scss'],
})
export class FinManBasicBalancePanelComponent {
  readonly GRADIENT_PROGRESS_BARS = GRADIENT_PROGRESS_BARS;
}
