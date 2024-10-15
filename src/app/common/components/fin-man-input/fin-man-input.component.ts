import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

import { FinManInputTypes } from '@common/components/fin-man-input/fin-man-input-types';

@Component({
  selector: 'fin-man-input',
  templateUrl: './fin-man-input.component.html',
  styleUrls: ['./fin-man-input.scss'],
})
export class FinManInputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() pattern?: string;
  @Input() allowedCharsPattern?: string;
  @Input() tooltip: string = '';
  @Input() iconClassName?: string;
  @Input() componentClassName: FinManInputTypes = FinManInputTypes.DEFAULT;
  @Input() thinInput: boolean = false;

  @Input({ required: true }) control!: FormControl;

  @Output() input = new EventEmitter<Event>();

  readonly FinManInputTypes = FinManInputTypes;

  private regExpPattern?: RegExp;

  // Set unique IDs for each input
  private static nextId = 0;
  public controlId = `fin-man-input-${FinManInputComponent.nextId++}`;
  public errorId = `${this.controlId}-error`;

  ngOnInit(): void {
    if (!this.control) {
      throw new Error('FormControl is required for FinManInputComponent');
    }

    if (this.allowedCharsPattern) {
      this.regExpPattern = new RegExp(this.allowedCharsPattern);
    }

    this.setValidators();
  }

  private setValidators(): void {
    // Collect any existing validators
    const existingValidators = this.control.validator ? [this.control.validator] : [];

    const validators = [...existingValidators];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.minlength != null) {
      validators.push(Validators.minLength(this.minlength));
    }
    if (this.maxlength != null) {
      validators.push(Validators.maxLength(this.maxlength));
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }
    if (this.min != null) {
      validators.push(Validators.min(this.min));
    }
    if (this.max != null) {
      validators.push(Validators.max(this.max));
    }

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  // Getter for error messages
  get errorMessages(): string[] {
    const messages: string[] = [];
    const controlErrors: ValidationErrors | null = this.control.errors;

    if (controlErrors) {
      for (const errorName of Object.keys(controlErrors)) {
        const errorValue = controlErrors[errorName];
        switch (errorName) {
          case 'required':
            messages.push('This field is required.');
            break;
          case 'minlength':
            messages.push(`Minimum length is ${errorValue.requiredLength} characters.`);
            break;
          case 'maxlength':
            messages.push(`Maximum length is ${errorValue.requiredLength} characters.`);
            break;
          case 'pattern':
            messages.push('Invalid format.');
            break;
          case 'min':
            messages.push(`Minimum value is ${errorValue.min}.`);
            break;
          case 'max':
            messages.push(`Maximum value is ${errorValue.max}.`);
            break;
          case 'passwordStrength':
            messages.push(
              'Password must contain uppercase, lowercase, number, and special character.',
            );
            break;
          case 'passwordMismatch':
            messages.push('Passwords do not match.');
            break;
          default:
            messages.push('Invalid value.');
            break;
        }
      }
    }

    return messages;
  }

  sanitizeInput(): void {
    const currentValue = this.control.value;

    // Filter out invalid characters by checking each character
    let filteredValue = '';
    for (const char of currentValue) {
      if (this.regExpPattern?.test(char)) {
        filteredValue += char;
      }
    }

    // Set the filtered value back to the input control
    if (currentValue !== filteredValue && this.type !== 'date') {
      this.control.setValue(filteredValue, { emitEvent: false });
    }
  }

  get isError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
