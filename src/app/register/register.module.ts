import { NgClass, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from '@app/register/register-routing.module';
import { RegisterComponent } from '@app/register/register.component';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [RegisterRoutingModule, CommonModule, ReactiveFormsModule, NgClass, NgIf],
})
export class RegisterModule {}
