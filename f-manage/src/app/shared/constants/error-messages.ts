export interface ErrorMessages {
  name: {
    required: string;
  };
  email: {
    required: string;
    email: string;
    invalidEmailDomain: string;
  };
  contact: {
    required: string;
    pattern: string;
    minlength: string;
    maxLength: string;
    invalidHyphenPosition: string;
  };
  address: {
    required: string;
    minlength: string;
    maxlength: string;
  };
  gender: {
    required: string;
  };
  role: {
    required: string;
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
  name: {
    required: 'Name is required'
  },
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address',
    invalidEmailDomain: 'Please enter a valid email address'
  },
  contact: {
    required: 'Phone number is required',
    pattern: 'Please enter a valid phone number',
    minlength: 'Phone number must be at least 10 digits',
    maxLength: 'Phone number cannot exceed 10 digits',
    invalidHyphenPosition: 'Invalid hyphen position'
  },
  address: {
    required: 'Address is required',
    minlength: 'Address must be at least 3 characters',
    maxlength: 'Address cannot exceed 30 characters'
  },
  gender: {
    required: 'Gender is required'
  },
  role: {
    required: 'Role is required'
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters',
    pattern: 'Password must contain both letters and numbers',
    uppercase: 'Password must contain at least one uppercase letter',
    specialChar: 'Password must contain at least one special character'
  }
}; 