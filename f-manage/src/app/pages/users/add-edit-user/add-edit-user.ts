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
import { IndexedDBService } from '../../../services/indexed-db.service';
import { User } from '../../../services/indexed-db.service';
import { finalize } from 'rxjs/operators';

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
    MatDividerModule
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
  
  newEmail = '';
  newContact = '';
  newAddress = '';


  emailError = signal<string>('');
  contactError = signal<string>('');
  addressError = signal<string>('');



  constructor(
    private fb: FormBuilder,
    private dbService: IndexedDBService
  ) {
    effect(() => {
      console.log(this.emailError());
    });
  }

  ngOnInit() {
    this.isEdit = !!this.userId;
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      tempEmail: ['', [Validators.email]],
      tempContact: ['', [Validators.pattern(/^\d{10}$/)]],
      tempAddress: [''],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

          user.email.forEach(email => {
            this.email.push(this.fb.control(email));
          });

          user.contact.forEach(contact => {
            this.contact.push(this.fb.control(contact));
          });

          user.address.forEach(address => {
            this.address.push(this.fb.control(address));
          });
        }
      });
    }

    this.email.valueChanges.subscribe(() => this.updateEmailValidation());
    this.contact.valueChanges.subscribe(() => this.updateContactValidation());
    this.address.valueChanges.subscribe(() => this.updateAddressValidation());
  }

  get email() { return this.form.get('email') as FormArray; }
  get contact() { return this.form.get('contact') as FormArray; }
  get address() { return this.form.get('address') as FormArray; }
  get tempEmail() { return this.form.get('tempEmail'); }
  get tempContact() { return this.form.get('tempContact'); }
  get tempAddress() { return this.form.get('tempAddress'); }

  updateEmailValidation() {
    const control = this.tempEmail;
    if (this.email.length === 0) {
      control?.setValidators([Validators.required, Validators.email]);
      this.emailError.set('At least one email is required');
    } else {
      control?.setValidators([Validators.email]);
      this.emailError.set('');
    }
    control?.updateValueAndValidity();
  }

  updateContactValidation() {
    const control = this.tempContact;
    if (this.contact.length === 0) {
      control?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);
      this.contactError.set('At least one phone number is required');
    } else {
      control?.setValidators([Validators.pattern('^[0-9]{10}$')]);
      this.contactError.set('');
    }
    control?.updateValueAndValidity();
  }

  updateAddressValidation() {
    const control = this.tempAddress;
    if (this.address.length === 0) {
      control?.setValidators([Validators.required]);
      this.addressError.set('At least one address is required');
    } else {
      control?.clearValidators();
      this.addressError.set('');
    }
    control?.updateValueAndValidity();
  }

  addToArray(key: 'email' | 'contact' | 'address') {
    let value = '';
    let control = null;

    switch(key) {
      case 'email':
        control = this.tempEmail;
        if (control?.valid) {
          value = control.value.trim();
          this.email.push(this.fb.control(value));
          control.reset();
        }
        break;
      case 'contact':
        control = this.tempContact;
        if (control?.valid) {
          value = control.value.trim();
          this.contact.push(this.fb.control(value));
          control.reset();
        }
        break;
      case 'address':
        control = this.tempAddress;
        if (control?.valid) {
          value = control.value.trim();
          this.address.push(this.fb.control(value));
          control.reset();
        }
        break;
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  removeFromArray(key: 'email' | 'contact' | 'address', index: number) {
    const arr = this.form.get(key) as FormArray;
    arr.removeAt(index);
  }

  close() {
    this.closed.emit();
  }

  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      
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
        },
        error: (error) => {
          console.error('Error saving user:', error);
        }
      });
    }
  }
}
