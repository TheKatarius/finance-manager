import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EmailVerificationFormGroup } from '@app/register/email-verification/email-verification-form-group.schema';

@Injectable()
export class EmailVerificationFormGroupService {
  private formBuilder = inject(FormBuilder);

  createEmailVerificationForm(): EmailVerificationFormGroup {
    return this.formBuilder.group({
      email: '',
      code: '',
    }) as EmailVerificationFormGroup;
  }
}
