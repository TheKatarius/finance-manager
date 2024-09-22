import { FormGroup, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(formGroup: FormGroup): ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup?.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null; // Don't validate if fields are empty
  }

  if (password !== confirmPassword) {
    formGroup.get('password')?.setErrors({ passwordMismatch: true });
    formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    const { passwordMismatch, ...errors } = formGroup.get('password')?.errors || {};
    const validationErrors = Object.keys(errors).length ? errors : null;

    formGroup.get('password')?.setErrors(validationErrors);
    formGroup.get('confirmPassword')?.setErrors(validationErrors);
  }

  return null;
}
