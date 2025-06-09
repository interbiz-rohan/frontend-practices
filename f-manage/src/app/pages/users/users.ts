import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../commons/components/header/header';
import { CustomTableComponent, TableColumn, TableAction } from '../../commons/components/custom-table/custom-table';
import { IndexedDBService, User } from '../../services/indexed-db.service';
import { PageEvent } from '@angular/material/paginator';
import { AddEditUser } from './add-edit-user/add-edit-user';
import { FooterComponent } from '../../commons/components/footer/footer';
import { ToastComponent } from '../../commons/components/toast-notification/toast-notification';
import { ToastService } from '../../commons/services/toast.service';
import { Layout } from '../../commons/components/layout/layout';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomTableComponent , AddEditUser , 
    Layout,
    ToastComponent],
  templateUrl: "./users.html",
  styleUrls: ["./users.scss"],
})
export class Users implements OnInit {
  users = signal<User[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  loading = signal<boolean>(false);
  searchTerm = signal<string>('');
  private searchDebounceTimeout: any;
  showUserModal = false;
  selectedUserId: string | null = null;
  newEmail = '';
  newContact = '';
  newAddress = '';

  columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'address', label: 'Location' },
    { key: 'created_at', label: 'Created', type: 'date' },
    { key: 'updated_at', label: 'Edited', type: 'date' }
  ];

  actions: TableAction[] = [
    {
      label: 'Edit',
      action: 'edit',
      class: 'edit',
      icon: 'bi-pencil'
    },
    {
      label: 'Delete',
      action: 'delete',
      class: 'delete',
      icon: 'bi-trash'
    }
  ];

  filteredUsers = signal<User[]>([]);
  
  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredUsers().slice(start, end).map(user => ({
      ...user,
      email: user.email.join(' + '),
      address: user.address[0] + (user.address.length > 1 ? ` + ${user.address.length - 1} more` : '')
    }));
  });

  totalItems = computed(() => this.filteredUsers().length);

  constructor(private dbService: IndexedDBService, private toastService: ToastService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.dbService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.applyFilters();
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

  onActionClick(event: { action: string, item: User }) {
    if (event.action === 'edit') {
      this.selectedUserId = event.item.id ?? null;
      this.showUserModal = true;
    } else if (event.action === 'delete') {
      if (confirm('Are you sure you want to delete this user?')) {
        if (event.item.id) {
          this.dbService.deleteUser(event.item.id).subscribe({
            next: () => {
              this.loadUsers();
              this.toastService.showSuccess('User deleted successfully');
            },
            error: (error: Error) => {
              console.error('Error deleting user:', error);
            }
          });
        }
      }
    }
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    clearTimeout(this.searchDebounceTimeout);
    this.searchDebounceTimeout = setTimeout(() => {
      this.searchTerm.set(input.value);
      this.currentPage.set(1);
      this.applyFilters();
    }, 300);
  }

  applyFilters() {
    let filtered = this.users();
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.join(' ').toLowerCase().includes(term)
      );
    }
    this.filteredUsers.set(filtered);
  }

  onAddUser() {
    this.selectedUserId = null;
    this.showUserModal = true;
  }

  onUserSaved() {
    this.showUserModal = false;
    this.loadUsers();
  }
}
