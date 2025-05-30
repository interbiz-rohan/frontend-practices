import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  user_id: string;
  created_on: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Files Dashboard</h1>
        <div class="user-info">
          Welcome, {{ currentUser?.name }}
          <button (click)="logout()" class="logout-btn">Logout</button>
        </div>
      </header>

      <div class="filters">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (ngModelChange)="filterFiles()"
          placeholder="Search files..."
          class="search-input"
        >
        <select 
          [(ngModel)]="selectedType" 
          (ngModelChange)="filterFiles()"
          class="type-filter"
        >
          <option value="">All Types</option>
          <option *ngFor="let type of fileTypes" [value]="type">{{ type }}</option>
        </select>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let file of filteredFiles">
              <td>{{ file.name }}</td>
              <td>{{ file.type }}</td>
              <td>{{ file.size }}</td>
              <td>{{ file.created_on }}</td>
              <td>
                <button (click)="downloadFile(file)" class="action-btn download">Download</button>
                <button (click)="deleteFile(file)" class="action-btn delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button 
          [disabled]="currentPage === 1" 
          (click)="changePage(currentPage - 1)"
          class="page-btn"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          [disabled]="currentPage === totalPages" 
          (click)="changePage(currentPage + 1)"
          class="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .search-input, .type-filter {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    .action-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .download {
      background-color: #28a745;
      color: white;
    }

    .delete {
      background-color: #dc3545;
      color: white;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .page-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .page-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class DashboardComponent implements OnInit {
  files: File[] = [];
  filteredFiles: File[] = [];
  currentUser: any;
  searchTerm: string = '';
  selectedType: string = '';
  fileTypes: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    // Load files from localStorage
    const allFiles = JSON.parse(localStorage.getItem('files') || '[]');
    
    // Filter files based on user role
    if (this.currentUser.role !== 'admin') {
      this.files = allFiles.filter((file: File) => file.user_id === this.currentUser.id);
    } else {
      this.files = allFiles;
    }

    // Get unique file types
    this.fileTypes = [...new Set(this.files.map(file => file.type))];
    
    this.filterFiles();
  }

  filterFiles() {
    let filtered = this.files;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedType) {
      filtered = filtered.filter(file => file.type === this.selectedType);
    }

    // Calculate pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.filteredFiles = filtered.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.filterFiles();
  }

  downloadFile(file: File) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteFile(file: File) {
    if (confirm('Are you sure you want to delete this file?')) {
      const files = JSON.parse(localStorage.getItem('files') || '[]');
      const updatedFiles = files.filter((f: File) => f.id !== file.id);
      localStorage.setItem('files', JSON.stringify(updatedFiles));
      this.loadFiles();
    }
  }

  logout() {
    this.authService.logout();
  }
} 