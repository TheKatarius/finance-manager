import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VALIDATION } from '@app/core/constants/validators.const';
import { AuthService } from '@app/core/data/auth.service';
import { LoginRequest, RegisterRequest } from '@app/core/interfaces/api-responses.schema';
import { NotificationService } from '@app/core/services/notifications.service';
import { confirmPasswordValidator } from '@app/core/validators/confirm-password-validator.utils';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import {
  LoginFormGroup,
  RegisterFormGroup,
} from '@app/register/register-form/register-form-group.schema';
import { RegisterFormGroupService } from '@app/register/register-form/register-form-group.service';

@Component({
  selector: 'finance-manager-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../../css/components/register/register.scss'],
  providers: [RegisterFormGroupService],
})
export class RegisterFormComponent implements OnInit {
  readonly VALIDATION = VALIDATION;

  readonly confirmPasswordValidator = confirmPasswordValidator;

  private registerFormGroupService = inject(RegisterFormGroupService);

  private authService = inject(AuthService);

  private notificationService = inject(NotificationService);

  private returnUrl: string = '/dashboard'; // Domyślny adres po logowaniu

  registerFormGroup!: RegisterFormGroup;

  isLeftActive: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

    this.registerFormGroup = this.registerFormGroupService.createRegisterForm();
  }

  get title(): string {
    return this.isLeftActive ? 'Create Account' : 'Welcome!';
  }

  get buttonTitle(): string {
    return this.isLeftActive ? 'Get Started' : 'Sign In';
  }

  registerUser(): void {
    if (validateFormGroup(this.registerFormGroup)) {
      const request: RegisterRequest = {
        login: this.registerFormGroup.value.login as string,
        email: this.registerFormGroup.value.email as string,
        password: this.registerFormGroup.value.password as string,
      };

      this.authService.register(request).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            this.router.navigate(['/login/authorization']).then(() => {
              this.notificationService.addNotification({
                type: 'success',
                status: response.status,
                message: 'User registered successfully',
              });
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.notificationService.addNotification({
            type: 'error',
            status: error.status,
            message: error.error?.message || 'Failed to register user',
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

  loginUser(): void {
    const loginFormGroup: LoginFormGroup = this.registerFormGroupService.createLoginForm(
      this.registerFormGroup,
    );

    if (validateFormGroup(loginFormGroup)) {
      const request: LoginRequest = {
        email_or_login: loginFormGroup.value.email_or_login as string,
        password: loginFormGroup.value.password as string,
      };

      this.authService.login(request).subscribe({
        next: (response) => {
          if (response.status >= 200 && response.status < 300) {
            this.router.navigateByUrl(this.returnUrl).then(() =>
              this.notificationService.addNotification({
                type: 'success',
                status: response.status,
                message: 'User logged in successfully',
              }),
            );
          }
        },
        error: (error) => {
          this.notificationService.addNotification({
            type: 'error',
            status: error.status,
            message: error.error?.message || 'Failed to login user',
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

  setActiveTab(leftTab: boolean): void {
    this.isLeftActive = leftTab;
  }
}
