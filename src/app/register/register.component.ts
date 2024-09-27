import { Component, inject, OnInit } from '@angular/core';

import { VALIDATION } from '@app/core/data/validators.const';
import { confirmPasswordValidator } from '@app/core/validators/confirm-password-validator.utils';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import { RegisterFormGroup } from '@app/register/register-form-group.schema';
import { RegisterFormGroupService } from '@app/register/register-form-group.service';

@Component({
  selector: 'finance-manager-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../css/components/register/register.scss'],
  providers: [RegisterFormGroupService],
})
export class RegisterComponent implements OnInit {
  readonly VALIDATION = VALIDATION;

  readonly confirmPasswordValidator = confirmPasswordValidator;

  private registerFormGroupService = inject(RegisterFormGroupService);

  registerFormGroup!: RegisterFormGroup;

  isLeftActive: boolean = true;

  ngOnInit(): void {
    this.registerFormGroup = this.registerFormGroupService.createRegisterForm();
  }

  get title(): string {
    return this.isLeftActive ? 'Create Account' : 'Welcome!';
  }

  get buttonTitle(): string {
    return this.isLeftActive ? 'Get Started' : 'Sign In';
  }

  registerUser(): void {
    if (validateFormGroup(this.registerFormGroup)) {
      console.log(this.registerFormGroup.value);
    } else {
      console.error('Form is invalid');
    }
  }

  setActiveTab(leftTab: boolean): void {
    this.isLeftActive = leftTab;
  }
}
