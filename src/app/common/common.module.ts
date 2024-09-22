import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonRoutingModule } from '@app/common/common-routing.module';
import { CommonComponent } from '@app/common/common.component';
import { FinManInputComponent } from '@app/common/components/fin-man-input/fin-man-input.component';
import { FinManBasicInfoPanelComponent } from '@common/components/fin-man-basic-info-panel/fin-man-basic-info-panel.component';

const COMMON_COMPONENTS = [FinManBasicInfoPanelComponent, FinManInputComponent];

@NgModule({
  declarations: [...COMMON_COMPONENTS, CommonComponent],
  imports: [RouterModule, CommonRoutingModule, NgIf, NgForOf, ReactiveFormsModule, NgClass],
  exports: [...COMMON_COMPONENTS],
})
export class CommonModule {}
