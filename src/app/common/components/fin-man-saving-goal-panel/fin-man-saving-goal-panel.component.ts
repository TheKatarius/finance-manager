import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { COLORS } from '@app/core/constants/colors.const';
import { GRADIENT_PROGRESS_BARS } from '@app/core/constants/gradient-progress-bars.const';
import { SavingGoals } from '@app/core/interfaces/saving-goals.schema';

@Component({
  selector: 'fin-man-saving-goal-panel',
  templateUrl: './fin-man-saving-goal-panel.component.html',
  styleUrls: ['./fin-man-saving-goal-panel.scss'],
})
export class FinManSavingGoalPanelComponent implements OnInit {
  @Input() savingGoalsData: SavingGoals[] = [];

  @Output() openModal = new EventEmitter<void>();

  readonly GRADIENT_PROGRESS_BARS = GRADIENT_PROGRESS_BARS;

  readonly COLORS = COLORS;

  savingGoalIndex = 0;

  panelTitle: string = 'Saving Goals';

  imageSrcMap: { [uuid: string]: string | ArrayBuffer | null } = {};

  ngOnInit(): void {
    this.savingGoalsData = this.savingGoalsData.map((goal) => {
      this.imageSrcMap[goal.uuid] = goal.img ?? '';
      return goal;
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, goalUuid: string): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrcMap[goalUuid] = reader.result;

          const goalIndex = this.savingGoalsData.findIndex((goal) => goal.uuid === goalUuid);
          if (goalIndex !== -1) {
            this.savingGoalsData[goalIndex].img = reader.result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  changeSavingGoal(next: boolean): void {
    if (next && this.savingGoalIndex !== this.savingGoalsData.length - 1) {
      this.savingGoalIndex = ++this.savingGoalIndex;
    } else if (!next && this.savingGoalIndex !== 0) {
      this.savingGoalIndex = --this.savingGoalIndex;
    }
  }
}
