import { Component, Input, Output, EventEmitter, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { IndexedDBService } from '../../../services/indexed-db.service';
import { User } from '../../../services/indexed-db.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { PhoneNumberPipe } from '../../../shared/pipes/phone-number.pipe';
import { getErrorMessage, isFieldInvalid, emailDomainValidator, passwordValidator } from '../../../shared/utils/form.utils';
import { FORM_ERROR_MESSAGES } from '../../../shared/constants/error-messages';
import { TooltipDirective } from '../../../shared/components/tooltip/tooltip';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PhoneNumberPipe,
    TooltipDirective
  ],
  templateUrl: './add-edit-user.html',
  styleUrls: ['./add-edit-user.scss']
})
export class AddEditUser implements OnInit {
  @Input() userId: string | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;
  hidePassword = true;
  isSubmitting = false;
  errorMessages = FORM_ERROR_MESSAGES;
  originalFormValue: any = null;
  hasFormChanged = signal(false);

  newEmail = '';
  newContact = '';
  newAddress = '';

  emailError = signal<string>('');
  contactError = signal<string>('');
  addressError = signal<string>('');

  private isClosing = false;

  constructor(
    private fb: FormBuilder,
    private dbService: IndexedDBService,
    private router: Router,
    private toastService: ToastService
  ) {
    effect(() => {
      console.log(this.emailError());
    });
  }

  ngOnInit() {
    this.isEdit = !!this.userId;
    this.form = this.fb.group({
      name: ['', Validators.required],
      tempEmail: ['', [Validators.required, Validators.email, emailDomainValidator()]],
      tempContact: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9-]{0,12}$/)]],
      tempAddress: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
      email: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      contact: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      address: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });

    if (this.isEdit && this.userId) {
      this.dbService.getUserById(this.userId).subscribe((user: User | null) => {
        if (user) {
          this.form.patchValue({
            name: user.name,
            gender: user.gender,
            role: user.role,
            password: user.password
          });

          while (this.email.length) this.email.removeAt(0);
          while (this.contact.length) this.contact.removeAt(0);
          while (this.address.length) this.address.removeAt(0);

          if (user.email.length == 1) {
            this.tempEmail?.setValue(user.email[0]);
          }
          else {
            user.email.forEach(email => {
              this.email.push(this.fb.control(email));
            });
          }

          if (user.contact.length == 1) {
            this.tempContact?.setValue(user.contact[0]);
          } else {
            user.contact.forEach(contact => {
              this.contact.push(this.fb.control(contact));
            });
          }
          if (user.address.length == 1) {
            this.tempAddress?.setValue(user.address[0]);
          } else {
            user.address.forEach(address => {
              this.address.push(this.fb.control(address));
            });
          }

          // Store original form value after setting all values
          this.originalFormValue = this.getFormValue();
        }
      });
    }

    console.log(this.form.value);

    this.email.valueChanges.subscribe(() => this.updateEmailValidation());
    this.contact.valueChanges.subscribe(() => this.updateContactValidation());
    this.address.valueChanges.subscribe(() => this.updateAddressValidation());

    // Subscribe to form value changes
    this.form.valueChanges.subscribe(() => {
      if (this.isEdit) {
        const currentValue = this.getFormValue();
        this.hasFormChanged.set(this.hasFormValuesChanged(this.originalFormValue, currentValue));
      }
    });
  }

  get email() { return this.form.get('email') as FormArray; }
  get contact() { return this.form.get('contact') as FormArray; }
  get address() { return this.form.get('address') as FormArray; }
  get tempEmail() { return this.form.get('tempEmail'); }
  get tempContact() { return this.form.get('tempContact'); }
  get tempAddress() { return this.form.get('tempAddress'); }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  removeFromArray(key: 'email' | 'contact' | 'address', index: number) {
    const arr = this.form.get(key) as FormArray;
    arr.removeAt(index);

    // Update validation after removal
    switch (key) {
      case 'email':
        this.updateEmailValidation();
        break;
      case 'contact':
        this.updateContactValidation();
        break;
      case 'address':
        this.updateAddressValidation();
        break;
    }
  }

  close() {
    this.isClosing = true;
    this.form.reset();
    this.closed.emit();
  }

  async submit() {
    console.log(this.form.value);
    try {
      this.isSubmitting = true;

      // Check if we have any values in temp fields that haven't been added to arrays
      console.log(this.tempEmail?.value, this.tempEmail?.valid);
      if (this.tempEmail?.value && this.tempEmail?.valid) {
        this.addToArray('email');
      }
      if (this.tempContact?.value && this.tempContact?.valid) {
        this.addToArray('contact');
      }
      if (this.tempAddress?.value && this.tempAddress?.valid) {
        this.addToArray('address');
      }

      // Validate that we have at least one value in each array
      if (this.email.length === 0 || this.contact.length === 0 || this.address.length === 0) {
        this.toastService.showError('Please add at least one value for email, contact, and address');
        this.isSubmitting = false;
        return;
      }

      const userData: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
        name: this.form.get('name')?.value,
        email: this.email.controls.map(control => control.value),
        contact: this.contact.controls.map(control => control.value),
        address: this.address.controls.map(control => control.value),
        gender: this.form.get('gender')?.value,
        password: this.form.get('password')?.value,
        role: this.form.get('role')?.value,
        date_of_birth: ''
      };

      let operation$;
      if (this.isEdit && this.userId) {
        operation$ = this.dbService.updateUser(this.userId, userData);
      } else {
        operation$ = this.dbService.addUser(userData);
      }

      operation$.pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      ).subscribe({
        next: (user) => {
          console.log('User saved successfully:', user);
          this.saved.emit();
          this.close();
          this.toastService.showSuccess(this.isEdit ? 'User updated successfully!' : 'User added successfully!');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error saving user:', error);
          this.toastService.showError(this.isEdit ? 'Failed to update user. Please try again.' : 'Failed to add user. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      this.toastService.showError('Error submitting form');
    } finally {
      this.isSubmitting = false;
    }
  }

  formatPassword(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove leading and trailing spaces
    value = value.trim();

    // Update input value
    input.value = value;
    this.form.get('password')?.setValue(value);
  }

  emailValidator() {
    return (control: any) => {
      const email = control.value;
      if (!email) return null;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);

      return isValid ? null : { invalidEmail: true };
    };
  }

  updateEmailValidation() {
    const control = this.tempEmail;
    if (this.email.length === 0) {
      control?.setValidators([Validators.required, Validators.email, this.emailValidator()]);
    } else {
      control?.setValidators([Validators.email, this.emailValidator()]);
    }
    control?.updateValueAndValidity({ emitEvent: false });
  }

  updateContactValidation() {
    const control = this.tempContact;
    if (this.contact.length === 0) {
      control?.setValidators([Validators.required, Validators.pattern(/^[0-9-]{0,12}$/), this.phoneNumberValidator()]);
    } else {
      control?.setValidators([Validators.pattern(/^[0-9-]{0,12}$/), this.phoneNumberValidator()]);
    }
    control?.updateValueAndValidity({ emitEvent: false });
  }

  phoneNumberValidator() {
    return (control: any) => {
      const value = control.value;
      if (!value) return null;

      const digitsOnly = value.replace(/-/g, '');

      if (digitsOnly.length > 10) {
        return { maxLength: true };
      }

      const hyphenPositions = [...value.matchAll(/-/g)].map(m => m.index);
      const validHyphenPositions = [3, 7];

      for (const pos of hyphenPositions) {
        if (!validHyphenPositions.includes(pos!)) {
          return { invalidHyphenPosition: true };
        }
      }

      return null;
    };
  }

  formatPhoneNumber(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + '-' + value.slice(7);
    }

    // Update input value
    input.value = value;
    this.tempContact?.setValue(value);
  }

  updateAddressValidation() {
    const control = this.tempAddress;
    if (this.address.length === 0) {
      control?.setValidators([Validators.required, Validators.maxLength(30), Validators.minLength(3)]);
    } else {
      control?.setValidators([Validators.maxLength(30), Validators.minLength(3)]);
    }
    control?.updateValueAndValidity();
  }

  addToArray(key: 'email' | 'contact' | 'address') {
    let value = '';
    let control = null;

    switch (key) {
      case 'email':
        control = this.tempEmail;
        if (control?.valid && control?.value?.trim()) {
          value = control.value.trim();
          this.email.push(this.fb.control(value));
          control.reset();
          this.updateEmailValidation();
        }
        break;
      case 'contact':
        control = this.tempContact;
        if (control?.valid && control?.value?.trim()) {
          value = control.value.trim();
          this.contact.push(this.fb.control(value));
          control.reset();
          this.updateContactValidation();
        }
        break;
      case 'address':
        control = this.tempAddress;
        if (control?.valid && control?.value?.trim()) {
          value = control.value.trim();
          this.address.push(this.fb.control(value));
          control.reset();
          this.updateAddressValidation();
        }
        break;
    }
  }

  CompleteFormValidate() {

  }

  getErrorMessage(control: any, fieldName: string): string {
    return getErrorMessage(control, fieldName as any, this.errorMessages);
  }

  isFieldInvalid(control: any): boolean {
    return isFieldInvalid(control, this.isSubmitting);
  }

  getFormValue() {
    return {
      name: this.form.get('name')?.value,
      tempEmail: this.tempEmail?.value,
      tempContact: this.tempContact?.value,
      tempAddress: this.tempAddress?.value,
      email: this.email.controls.map(control => control.value),
      contact: this.contact.controls.map(control => control.value),
      address: this.address.controls.map(control => control.value),
      gender: this.form.get('gender')?.value,
      role: this.form.get('role')?.value,
      password: this.form.get('password')?.value
    };
  }

  hasFormValuesChanged(original: any, current: any): boolean {
    if (!original || !current) return false;

    // Compare arrays
    const arraysEqual = (arr1: any[], arr2: any[]) => {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((val, index) => val === arr2[index]);
    };

    return (
      original.name !== current.name ||
      !arraysEqual(original.email, current.email) ||
      !arraysEqual(original.contact, current.contact) ||
      !arraysEqual(original.address, current.address) ||
      original.tempEmail !== current.tempEmail ||
      original.tempContact !== current.tempContact ||
      original.tempAddress !== current.tempAddress ||
      original.gender !== current.gender ||
      original.role !== current.role ||
      original.password !== current.password
    );
  }
}
