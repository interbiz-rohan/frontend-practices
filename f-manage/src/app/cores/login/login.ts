import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/components/footer/footer';
import { AuthService } from '../../services/auth.service';
import { FORM_ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { emailDomainValidator, getErrorMessage, isFieldInvalid, passwordValidator } from '../../shared/utils/form.utils';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader';
import { delay, pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FooterComponent,
    PageLoaderComponent
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = signal(false);
  submitted = false;
  hidePassword = true;
  error = '';
  readonly errorMessages = FORM_ERROR_MESSAGES;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, emailDomainValidator()]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        passwordValidator()
      ]]
    });
  }

  get f() { return this.loginForm.controls; }

 

  getErrorMessage(controlName: string): string {
    return getErrorMessage(this.f[controlName], controlName as keyof typeof this.errorMessages, this.errorMessages);
  }

  isFieldInvalid(controlName: string): boolean {
    return isFieldInvalid(this.f[controlName], this.submitted);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.authService.login(this.f['email'].value, this.f['password'].value)
    .pipe(
      delay(1000)
    )
    .subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/files']);
        } else {
          this.error = 'Invalid email or password';
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = 'An error occurred during login';
        this.loading.set(false);
      }
    });
  }
} 