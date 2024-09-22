import { FormGroup } from '@angular/forms';

export function validateFormGroup(formGroup: FormGroup): boolean {
  formGroup.markAllAsTouched();

  return formGroup.valid;
}
