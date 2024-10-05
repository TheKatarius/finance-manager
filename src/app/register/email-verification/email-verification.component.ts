import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VALIDATION } from '@app/core/constants/validators.const';
import { AuthService } from '@app/core/data/auth.service';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import { EmailVerificationFormGroup } from '@app/register/email-verification/email-verification-form-group.schema';
import { EmailVerificationFormGroupService } from '@app/register/email-verification/email-verification-form-group.service';

@Component({
  selector: 'finance-manager-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: [
    '../../../css/components/register/email-verification.scss',
    '../../../css/components/register/register.scss',
  ],
  providers: [EmailVerificationFormGroupService],
})
export class EmailVerificationComponent implements OnInit {
  readonly VALIDATION = VALIDATION;

  private emailVerificationFormGroupService = inject(EmailVerificationFormGroupService);

  private authService = inject(AuthService);

  private router = inject(Router);

  emailVerificationFormGroup!: EmailVerificationFormGroup;

  ngOnInit(): void {
    this.emailVerificationFormGroup =
      this.emailVerificationFormGroupService.createEmailVerificationForm();
  }

  verifyAccount(): void {
    if (validateFormGroup(this.emailVerificationFormGroup)) {
      const { email, code } = this.emailVerificationFormGroup.value;

      this.authService.verifyEmail(email as string, code as string).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Failed to verify email: ', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
