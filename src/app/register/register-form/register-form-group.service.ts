import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { passwordStrengthValidator } from '@app/core/validators/password-strength-validator.utils';
import {
  LoginFormGroup,
  RegisterFormGroup,
} from '@app/register/register-form/register-form-group.schema';

@Injectable()
export class RegisterFormGroupService {
  private formBuilder = inject(FormBuilder);

  createRegisterForm(): RegisterFormGroup {
    return this.formBuilder.group({
      login: '',
      email: '',
      password: ['', [passwordStrengthValidator]],
      confirmPassword: '',
    }) as RegisterFormGroup;
  }

  createLoginForm(registerFormGroup: RegisterFormGroup): LoginFormGroup {
    return this.formBuilder.group({
      email_or_login: registerFormGroup.controls.email,
      password: registerFormGroup.controls.password,
    }) as LoginFormGroup;
  }
}
