export interface ErrorMessages {
  email: {
    required: string;
    email: string;
    invalidEmailDomain: string;
  };
  password: {
    required: string;
    minlength: string;
    pattern: string;
    uppercase: string;
    specialChar: string;
  };
}

export const FORM_ERROR_MESSAGES: ErrorMessages = {
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address',
    invalidEmailDomain: 'Please enter a valid email address'
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters',
    pattern: 'Password must contain both letters and numbers',
    uppercase: 'Password must contain at least one uppercase letter',
    specialChar: 'Password must contain at least one special character'
  }
}; 