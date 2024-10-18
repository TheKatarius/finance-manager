import { Component, EventEmitter, Input, Output } from '@angular/core';

import { COLORS } from '@app/core/constants/colors.const';
import { GRADIENT_PROGRESS_BARS } from '@app/core/constants/gradient-progress-bars.const';

@Component({
  selector: 'fin-man-saving-goal-panel',
  templateUrl: './fin-man-saving-goal-panel.component.html',
  styleUrls: ['./fin-man-saving-goal-panel.scss'],
})
export class FinManSavingGoalPanelComponent {
  @Input() goalData: string[] = [];

  @Output() openModal = new EventEmitter<void>();

  readonly GRADIENT_PROGRESS_BARS = GRADIENT_PROGRESS_BARS;

  readonly COLORS = COLORS;

  panelTitle: string = 'Saving Goals';

  imageSrc: string | ArrayBuffer | null = null;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
