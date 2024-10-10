import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VALIDATION } from '@app/core/constants/validators.const';
import { AuthService } from '@app/core/data/auth.service';
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

  private router = inject(Router);

  registerFormGroup!: RegisterFormGroup;

  isLeftActive: boolean = true;

  ngOnInit(): void {
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
      const { email, login, password } = this.registerFormGroup.value;

      this.authService.register(email as string, login as string, password as string).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/login/authorization']);
          }
        },
        error: (error) => {
          console.error('Failed to register user: ', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  loginUser(): void {
    const loginFormGroup: LoginFormGroup = this.registerFormGroupService.createLoginForm(
      this.registerFormGroup,
    );

    if (validateFormGroup(loginFormGroup)) {
      const { email, password } = loginFormGroup.value;

      this.authService.login(email as string, password as string).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            console.log('User logged in');
          }
        },
        error: (error) => {
          console.error('Failed to register user: ', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  setActiveTab(leftTab: boolean): void {
    this.isLeftActive = leftTab;
  }
}