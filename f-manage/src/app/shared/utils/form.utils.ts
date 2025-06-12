import { AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../constants/error-messages';

export function getErrorMessage(
  control: AbstractControl | null,
  controlName: keyof ErrorMessages,
  errorMessages: ErrorMessages
): string {
  if (control && control.errors) {
    const firstError = Object.keys(control.errors)[0] as keyof ErrorMessages[keyof ErrorMessages];
    return errorMessages[controlName][firstError] || 'Invalid input';
  }
  return '';
}

export function isFieldInvalid(control: AbstractControl | null, submitted: boolean): boolean {
  return !!(control && control.errors);
}

export function isFieldRequired(control: AbstractControl | null): boolean {
  return !!(control && control.errors && control.errors['required']);
} 

export function emailDomainValidator() {
  return (control: any) => {
    const email = control.value;
    if (!email) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return isValid ? null : { invalidEmailDomain: true };
  };
}

export function passwordValidator() {
  return (control: any) => {
    const password = control.value;
    if (!password) return null;

    const errors: any = {};

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = true;
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.specialChar = true;
    }

    // Check for alphanumeric
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password)) {
      errors.pattern = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}