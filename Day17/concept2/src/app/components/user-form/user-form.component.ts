import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-form">
      <h2>Add New User</h2>
      <form (ngSubmit)="onSubmit()" #userForm="ngForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            [(ngModel)]="user.name"
            required
            #name="ngModel"
          />
          <div *ngIf="name.invalid && (name.dirty || name.touched)" class="error">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="user.email"
            required
            email
            #email="ngModel"
          />
          <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error">
            Valid email is required
          </div>
        </div>

        <button type="submit" [disabled]="userForm.invalid">Add User</button>
      </form>
    </div>
  `,
  styles: [`
    .user-form {
      padding: 20px;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 5px;
    }
    button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #45a049;
    }
  `]
})
export class UserFormComponent {
  user: User = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(private dataService: DataService) {}

  onSubmit(): void {
    if (this.user.name && this.user.email) {
      this.user.id = Date.now(); // Generate a unique ID
      this.dataService.addUser(this.user);
      this.user = { id: 0, name: '', email: '' }; // Reset form
    }
  }
} 