import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '@app/register/register.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
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
export class RegisterRoutingModule {}
