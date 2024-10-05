import { FormControl, FormGroup } from '@angular/forms';

export type RegisterFormGroup = FormGroup<{
  login: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}>;

export type LoginFormGroup = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}>;
