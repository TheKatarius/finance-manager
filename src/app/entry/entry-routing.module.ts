import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from '@app/entry/entry.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'common',
        loadChildren: () => import('../common/common.module').then((m) => m.CommonModule),
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'home',
        loadChildren: () => import('@app/menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRIMARY_ROUTES)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
