import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserDetailComponent],
  template: `
    <div class="user-list">
      <h2>User List</h2>
      
      <!-- Using CommonModule's *ngFor -->
      <div *ngFor="let user of users" class="user-item">
        <span>{{ user.name }}</span>
        <button (click)="selectUser(user)">View Details</button>
      </div>

      <!-- Using FormsModule's ngModel -->
      <div class="add-user">
        <input [(ngModel)]="newUserName" placeholder="Enter user name" />
        <button (click)="addUser()">Add User</button>
      </div>

      <!-- Using UserDetailComponent -->
      <app-user-detail [user]="selectedUser"></app-user-detail>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
    }
    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin: 5px 0;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .add-user {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #1565c0;
    }
  `]
})
export class UserListComponent {
  users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];

  selectedUser: any = null;
  newUserName = '';

  selectUser(user: any) {
    this.selectedUser = user;
  }

  addUser() {
    if (this.newUserName.trim()) {
      const newUser = {
        id: this.users.length + 1,
        name: this.newUserName
      };
      this.users.push(newUser);
      this.newUserName = '';
    }
  }
} 