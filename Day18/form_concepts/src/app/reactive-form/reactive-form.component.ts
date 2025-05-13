import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl:"./reactive-form.component.css"
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      account: this.fb.group({
        username: ['', {
          validators: [Validators.required, Validators.minLength(4)],
          asyncValidators: [this.uniqueUsernameValidator],
          updateOn: 'blur'
        }],
        email: ['', [Validators.required, Validators.email]]
      }),
      password: ['', [Validators.required, Validators.minLength(8), this.uniquePasswordValidator]],
      confirmPassword: [],
      address: this.fb.group({
        type: ['digital'],
        street: [{ value: '', disabled: true }],
        city: [{ value: '', disabled: true }]
      }),
      hobbies: this.fb.array([]),
      agree: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    this.form.get('address.type')?.valueChanges.subscribe(type => {
      const street = this.form.get('address.street');
      const city = this.form.get('address.city');
      if (type === 'physical') {
        street?.enable();
        city?.enable();
        street?.setValidators([Validators.required]);
        city?.setValidators([Validators.required]);
      } else {
        street?.disable();
        city?.disable();
        street?.clearValidators();
        city?.clearValidators();
      }
      street?.updateValueAndValidity();
      city?.updateValueAndValidity();
    });
  }

  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  addHobby(): void {
    this.hobbies.push(new FormControl('', Validators.required));
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  uniqueUsernameValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const takenUsernames = ['admin', 'user123'];

    return of(takenUsernames.includes(control.value)).pipe(
      delay(800),
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  }

  uniquePasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;
    
    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;
    let hasUnderscore = false;
    let hasMinLength = password.length >= 8;

    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);
      
      if (code >= 65 && code <= 90) hasUpper = true; 
      if (code >= 97 && code <= 122) hasLower = true;   
      if (code >= 48 && code <= 57) hasDigit = true;    
      if (code === 95) hasUnderscore = true;           
    }

    if (!hasUpper || !hasLower || !hasDigit || !hasUnderscore || !hasMinLength) {
      return { passwordInvalid: true };
    }
    
    return null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Form submitted:', this.form.getRawValue());
  }
} 