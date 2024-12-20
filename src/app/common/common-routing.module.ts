import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonComponent } from '@app/common/common.component';
import { FinManBasicInfoPanelComponent } from '@app/common/components/fin-man-basic-info-panel/fin-man-basic-info-panel.component';
import { FinManInputComponent } from '@app/common/components/fin-man-input/fin-man-input.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        component: CommonComponent,
      },
      {
        path: 'basic-info-panel',
        component: FinManBasicInfoPanelComponent,
      },
      {
        path: 'input',
        component: FinManInputComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRIMARY_ROUTES)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
