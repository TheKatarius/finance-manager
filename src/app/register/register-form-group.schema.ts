import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export type PasswordFormControl = (
  | string
  | ((control: FormControl<string>) => ValidationErrors | null)[]
)[];

export type RegisterFormGroup = FormGroup<{
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<PasswordFormControl | null>;
  confirmPassword: FormControl<PasswordFormControl | null>;
}>;
