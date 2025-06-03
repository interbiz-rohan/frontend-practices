import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../commons/components/header/header';
import { CustomTableComponent, TableColumn, TableAction } from '../../commons/components/custom-table/custom-table';
import { IndexedDBService, File } from '../../services/indexed-db.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, CustomTableComponent],
  templateUrl: "./files.html",
  styleUrls: ["./files.scss"],
})
export class FilesCompoenent implements OnInit {
  files: File[] = [];
  currentUser: any;
  searchTerm: string = '';
  selectedType: string = '';
  fileTypes: string[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  loading: boolean = false;

  columns: TableColumn[] = [
    { key: 'name', label: 'File Name' },
    { key: 'type', label: 'Type' },
    { key: 'size', label: 'Size' },
    { key: 'created_on', label: 'Created On', type: 'date' }
  ];

  actions: TableAction[] = [
    { 
      label: 'Download', 
      action: 'download', 
      class: 'download',
      icon: 'download' 
    },
    { 
      label: 'Delete', 
      action: 'delete', 
      class: 'delete',
      icon: 'delete' 
    }
  ];

  constructor(
    private authService: AuthService,
    private dbService: IndexedDBService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.loading = true;
    const files$ = this.currentUser.role === 'admin' 
      ? this.dbService.getAllFiles()
      : this.dbService.getFilesByUser(this.currentUser.id);

    files$.subscribe({
      next: (files) => {
        this.files = files;
        this.totalItems = files.length;
        this.fileTypes = [...new Set(files.map(file => file.type))];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading files:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadFiles();
  }

  onActionClick(event: { action: string, item: File }) {
    switch (event.action) {
      case 'download':
        this.downloadFile(event.item);
        break;
      case 'delete':
        this.deleteFile(event.item);
        break;
    }
  }

  downloadFile(file: File) {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteFile(file: File) {
    if (confirm('Are you sure you want to delete this file?')) {
      this.dbService.deleteFile(file.id!).subscribe({
        next: () => {
          this.loadFiles();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
} 