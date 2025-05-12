import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <h2>User Profile Form</h2>
      
      <!-- Form with all validation examples -->
      <form #profileForm="ngForm" (ngSubmit)="onSubmit(profileForm)" class="profile-form">
        
        <!-- Basic Information Section -->
        <div class="form-section">
          <h3>Basic Information</h3>
          
          <!-- Name with required and minlength validation -->
          <div class="form-group">
            <label for="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="userProfile.name"
              required
              minlength="3"
              #name="ngModel"
              [class.is-invalid]="name.invalid && (name.dirty || name.touched)"
            />
            <div class="validation-error" *ngIf="name.invalid && (name.dirty || name.touched)">
              <div *ngIf="name.errors?.['required']">Name is required</div>
              <div *ngIf="name.errors?.['minlength']">Name must be at least 3 characters</div>
            </div>
          </div>

          <!-- Email with pattern validation -->
          <div class="form-group">
            <label for="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="userProfile.email"
              required
              email
              #email="ngModel"
              [class.is-invalid]="email.invalid && (email.dirty || email.touched)"
            />
            <div class="validation-error" *ngIf="email.invalid && (email.dirty || email.touched)">
              <div *ngIf="email.errors?.['required']">Email is required</div>
              <div *ngIf="email.errors?.['email']">Please enter a valid email</div>
            </div>
          </div>

          <!-- Phone with pattern validation -->
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              [(ngModel)]="userProfile.phone"
              pattern="[0-9]{10}"
              #phone="ngModel"
              [class.is-invalid]="phone.invalid && (phone.dirty || phone.touched)"
            />
            <div class="validation-error" *ngIf="phone.invalid && (phone.dirty || phone.touched)">
              <div *ngIf="phone.errors?.['pattern']">Please enter a valid 10-digit phone number</div>
            </div>
          </div>
        </div>

        <!-- Address Section -->
        <div class="form-section">
          <h3>Address Information</h3>
          
          <!-- Street Address -->
          <div class="form-group">
            <label for="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              [(ngModel)]="userProfile.address.street"
              #street="ngModel"
            />
          </div>

          <!-- City with required validation -->
          <div class="form-group">
            <label for="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              [(ngModel)]="userProfile.address.city"
              required
              #city="ngModel"
              [class.is-invalid]="city.invalid && (city.dirty || city.touched)"
            />
            <div class="validation-error" *ngIf="city.invalid && (city.dirty || city.touched)">
              <div *ngIf="city.errors?.['required']">City is required</div>
            </div>
          </div>

          <!-- State with required validation -->
          <div class="form-group">
            <label for="state">State*</label>
            <select
              id="state"
              name="state"
              [(ngModel)]="userProfile.address.state"
              required
              #state="ngModel"
              [class.is-invalid]="state.invalid && (state.dirty || state.touched)"
            >
              <option value="">Select State</option>
              <option *ngFor="let state of states" [value]="state">{{state}}</option>
            </select>
            <div class="validation-error" *ngIf="state.invalid && (state.dirty || state.touched)">
              <div *ngIf="state.errors?.['required']">State is required</div>
            </div>
          </div>

          <!-- ZIP with pattern validation -->
          <div class="form-group">
            <label for="zip">ZIP Code*</label>
            <input
              type="text"
              id="zip"
              name="zip"
              [(ngModel)]="userProfile.address.zip"
              required
              pattern="[0-9]{5}"
              #zip="ngModel"
              [class.is-invalid]="zip.invalid && (zip.dirty || zip.touched)"
            />
            <div class="validation-error" *ngIf="zip.invalid && (zip.dirty || zip.touched)">
              <div *ngIf="zip.errors?.['required']">ZIP code is required</div>
              <div *ngIf="zip.errors?.['pattern']">Please enter a valid 5-digit ZIP code</div>
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="form-section">
          <h3>Preferences</h3>
          
          <!-- Newsletter Subscription -->
          <div class="form-group checkbox-group">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              [(ngModel)]="userProfile.preferences.newsletter"
              #newsletter="ngModel"
            />
            <label for="newsletter">Subscribe to Newsletter</label>
          </div>

          <!-- Communication Preferences -->
          <div class="form-group">
            <label>Preferred Contact Method*</label>
            <div class="radio-group">
              <div class="radio-option">
                <input
                  type="radio"
                  id="contactEmail"
                  name="contactMethod"
                  value="email"
                  [(ngModel)]="userProfile.preferences.contactMethod"
                  required
                  #contactMethod="ngModel"
                />
                <label for="contactEmail">Email</label>
              </div>
              <div class="radio-option">
                <input
                  type="radio"
                  id="contactPhone"
                  name="contactMethod"
                  value="phone"
                  [(ngModel)]="userProfile.preferences.contactMethod"
                />
                <label for="contactPhone">Phone</label>
              </div>
            </div>
            <div class="validation-error" *ngIf="contactMethod.invalid && (contactMethod.dirty || contactMethod.touched)">
              <div *ngIf="contactMethod.errors?.['required']">Please select a contact method</div>
            </div>
          </div>
        </div>

        <!-- Form Status and Submit Button -->
        <div class="form-status">
          <div *ngIf="profileForm.invalid && (profileForm.dirty || profileForm.touched)" class="form-error">
            Please fill in all required fields correctly
          </div>
          <div *ngIf="formSubmitted" class="form-success">
            Form submitted successfully!
          </div>
        </div>

        <div class="form-actions">
          <button type="button" (click)="resetForm(profileForm)" class="btn-reset">Reset</button>
          <button type="submit" [disabled]="profileForm.invalid" class="btn-submit">Submit</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .profile-form {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 4px;
    }

    .form-section h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: 500;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    input.is-invalid,
    select.is-invalid {
      border-color: #dc3545;
    }

    .validation-error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    }

    .checkbox-group,
    .radio-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .radio-group {
      flex-direction: column;
      align-items: flex-start;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .form-status {
      margin: 20px 0;
    }

    .form-error {
      color: #dc3545;
      padding: 10px;
      background-color: #f8d7da;
      border-radius: 4px;
    }

    .form-success {
      color: #28a745;
      padding: 10px;
      background-color: #d4edda;
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-submit {
      background-color: #007bff;
      color: white;
    }

    .btn-submit:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-reset {
      background-color: #6c757d;
      color: white;
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  userProfile = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    preferences: {
      newsletter: false,
      contactMethod: ''
    }
  };

  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  formSubmitted = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Initialize form if needed
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.userProfile);
      this.formSubmitted = true;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.formSubmitted = false;
        this.resetForm(form);
      }, 3000);
    }
  }

  resetForm(form: any): void {
    form.resetForm();
    this.userProfile = {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      preferences: {
        newsletter: false,
        contactMethod: ''
      }
    };
    this.formSubmitted = false;
  }
} 