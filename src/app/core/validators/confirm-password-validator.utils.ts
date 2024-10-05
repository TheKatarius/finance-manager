import { FormGroup } from '@angular/forms';

export function confirmPasswordValidator(formGroup: FormGroup): void {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup?.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return; // Don't validate if fields are empty
  }

  if (password !== confirmPassword) {
    const errors = formGroup.get('password')?.errors || {};
    formGroup.get('password')?.setErrors({ ...errors, passwordMismatch: true });
    formGroup.get('confirmPassword')?.setErrors({ ...errors, passwordMismatch: true });
  } else {
    const { passwordMismatch, ...errors } = formGroup.get('password')?.errors || {};
    const validationErrors = Object.keys(errors).length ? errors : null;

    formGroup.get('password')?.setErrors(validationErrors);
    formGroup.get('confirmPassword')?.setErrors(validationErrors);
  }
}
