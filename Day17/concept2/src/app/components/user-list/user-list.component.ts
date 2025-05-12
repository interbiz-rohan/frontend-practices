import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list">
      <h2>Users</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="users.length === 0" class="no-users">No users found</div>
      <ul *ngIf="users.length > 0">
        <li *ngFor="let user of users">
          {{ user.name }} ({{ user.email }})
          <button (click)="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
    }
    .error {
      color: red;
      margin: 10px 0;
    }
    .no-users {
      color: #666;
      font-style: italic;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      padding: 5px 10px;
      background-color: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #cc0000;
    }
  `]
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  error: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.error = '';
      },
      error: (error) => {
        this.error = error.message;
        this.users = [];
      }
    });
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
} 