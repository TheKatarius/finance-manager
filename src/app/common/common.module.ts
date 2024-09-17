import { NgModule } from '@angular/core';
import { CommonComponent } from '@app/common/common.component';
import { RouterModule } from '@angular/router';
import { CommonRoutingModule } from '@app/common/common-routing.module';
import { FinManBasicInfoPanelComponent } from '@app/common/components/fin-man-basic-info-panel/fin-man-basic-info-panel.component';

const COMMON_COMPONENTS = [FinManBasicInfoPanelComponent];

@NgModule({
  declarations: [...COMMON_COMPONENTS, CommonComponent],
  imports: [RouterModule, CommonRoutingModule],
  exports: [...COMMON_COMPONENTS],
})
export class CommonModule {}
