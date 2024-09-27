import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from '@app/menu/menu.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
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
export class MenuRoutingModule {}
