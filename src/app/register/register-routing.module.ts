import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailVerificationComponent } from '@app/register/email-verification/email-verification.component';
import { RegisterFormComponent } from '@app/register/register-form/register-form.component';
import { RegisterComponent } from '@app/register/register.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: '',
        component: RegisterFormComponent,
      },
      {
        path: 'authorization',
        component: EmailVerificationComponent,
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
export class RegisterRoutingModule {}
