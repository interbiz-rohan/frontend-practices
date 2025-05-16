import { Component, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common';

interface User {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-deferred-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deferred-content.component.html',
  styleUrls: ['./deferred-content.component.css']
})
export class DeferredContentComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'John Doe', role: 'Admin', isActive: true },
    { id: 2, name: 'Jane Smith', role: 'User', isActive: false },
    { id: 3, name: 'Bob Johnson', role: 'User', isActive: true }
  ];

  showHeavyContent = false;
  isLoading = false;
  hasError = false;
  selectedUser: User | null = null;

  ngOnInit(): void {
    // Simulate loading state
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  toggleHeavyContent(): void {
    this.showHeavyContent = !this.showHeavyContent;
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  simulateError(): void {
    this.hasError = true;
  }
} 