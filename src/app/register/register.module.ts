import { NgClass, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailVerificationComponent } from '@app/register/email-verification/email-verification.component';
import { RegisterFormComponent } from '@app/register/register-form/register-form.component';
import { RegisterRoutingModule } from '@app/register/register-routing.module';
import { RegisterComponent } from '@app/register/register.component';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [RegisterComponent, EmailVerificationComponent, RegisterFormComponent],
  imports: [RegisterRoutingModule, CommonModule, ReactiveFormsModule, NgClass, NgIf],
})
export class RegisterModule {}
