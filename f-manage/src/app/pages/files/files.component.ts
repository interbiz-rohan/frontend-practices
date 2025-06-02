import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../commons/components/header/header';

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
  imports: [CommonModule, FormsModule,HeaderComponent],
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"],
})
export class FilesCompoenent implements OnInit {
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