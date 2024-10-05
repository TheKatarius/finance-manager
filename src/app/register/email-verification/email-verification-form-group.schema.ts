import { FormControl, FormGroup } from '@angular/forms';

export type EmailVerificationFormGroup = FormGroup<{
  email: FormControl<string | null>;
  code: FormControl<string | null>;
}>;
