import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { MenuComponent } from '@app/menu/menu.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    outlet: 'primary',
    children: [
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRIMARY_ROUTES)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
