import { Component, Input, OnChanges } from '@angular/core';

import { Directions } from '@app/core/interfaces/common-enums.schema';

@Component({
  selector: 'fin-man-progress-bar',
  templateUrl: './fin-man-progress-bar.component.html',
  styleUrls: ['./fin-man-progress-bar.scss'],
})
export class FinManProgressBarComponent implements OnChanges {
  @Input() max = 100;

  @Input() value = 0;

  @Input() gradientColor: string = '';

  @Input() iconClass: string = '';

  @Input() isIconVisible: boolean = true;

  @Input() tooltipDescription: string = '';

  @Input() tooltipDisplayDirection: Directions = Directions.Up;

  @Input() moveLabelBelowProgressBar: boolean = false;

  progressPercentage = 0;

  showTooltip = false;

  ngOnChanges(): void {
    setTimeout(() => {
      this.updateProgress();
    }, 50);
  }

  updateProgress(): void {
    // Ensure `value` never exceeds `max`
    const safeValue = Math.min(this.value, this.max);
    this.progressPercentage = (safeValue / this.max) * 100;
  }

  protected readonly Directions = Directions;
}
