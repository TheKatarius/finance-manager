import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { passwordStrengthValidator } from '@app/core/validators/password-strength-validator.utils';
import { RegisterFormGroup } from '@app/register/register-form-group.schema';

@Injectable()
export class RegisterFormGroupService {
  private formBuilder = inject(FormBuilder);

  createRegisterForm(): RegisterFormGroup {
    return this.formBuilder.group({
      username: '',
      email: '',
      password: ['', [passwordStrengthValidator]],
      confirmPassword: '',
    }) as RegisterFormGroup;
  }
}
