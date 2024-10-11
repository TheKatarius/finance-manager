import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VALIDATION } from '@app/core/constants/validators.const';
import { AuthService } from '@app/core/data/auth.service';
import { NotificationService } from '@app/core/services/notifications.service';
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

  private notificationService = inject(NotificationService);

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
          if (response.status >= 200 && response.status < 300) {
            this.router.navigate(['/login']).then(() => {
              this.notificationService.addNotification({
                type: 'success',
                status: response.status,
                message: response?.message || 'Account was verified successfully',
              });
            });
          }
        },
        error: (error) => {
          this.notificationService.addNotification({
            type: 'error',
            status: error.status,
            message: error.error?.message || 'Failed to verify user',
          });
        },
      });
    } else {
      this.notificationService.addNotification({
        type: 'error',
        message: 'Form is invalid',
      });
    }
  }
}
