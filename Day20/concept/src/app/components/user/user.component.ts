import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  selectedUserId: number | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;

      if (this.isEditing && this.selectedUserId) {
        // Update existing user
        this.userService.updateUser(this.selectedUserId, userData).subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating user:', error);
          }
        });
      } else {
        // Create new user
        this.userService.createUser(userData).subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating user:', error);
          },
        });
      }
    }
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.selectedUserId = user.id || null;
    this.userForm.patchValue(user);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.selectedUserId = null;
  }
} 