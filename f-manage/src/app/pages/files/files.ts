import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../commons/components/header/header';
import { CustomTableComponent, TableColumn, TableAction } from '../../commons/components/custom-table/custom-table';
import { IndexedDBService, File } from '../../services/indexed-db.service';
import { UploadFileModal } from './components/upload/upload';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, CustomTableComponent, UploadFileModal],
  templateUrl: "./files.html",
  styleUrls: ["./files.scss"],
})
export class FilesCompoenent implements OnInit {
  // Signals
  files = signal<File[]>([]);
  filteredFiles = signal<File[]>([]);
  currentPage = signal<number>(1);
  pageSize = signal<number>(5);
  loading = signal<boolean>(false);
  searchTerm = signal<string>('');
  selectedType = signal<string>('');
  showUploadModal = signal<boolean>(false);

  // Computed values
  paginatedFiles = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    const filtered = this.filteredFiles();
    return filtered.slice(start, end);
  });

  totalItems = computed(() => this.filteredFiles().length);
  fileTypes = computed(() => [...new Set(this.files().map(file => file.type))]);

  currentUser: any;
  selectedTab: string = 'All';

  columns: TableColumn[] = [
    { key: 'name', label: 'File Name', width: "20%" },
    { key: "overview", label: "Overview", width: "30%" },
    { key: 'type', label: 'Type' },
    { key: 'size', label: 'Size' },
    { key: 'user_id', label: 'Author' },
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
    this.loading.set(true);
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) return;

    const files$ = currentUser.role === 'admin'
      ? this.dbService.getAllFiles()
      : this.dbService.getFilesByUser(currentUser.id || '');

    files$.subscribe({
      next: (files) => {
        this.files.set(files);
        this.applyFilters();
        this.currentPage.set(1);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading files:', error);
        this.loading.set(false);
      }
    });
  }

  applyFilters() {
    let filtered = this.files();
    
    // Apply search filter
    if (this.searchTerm()) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedType()) {
      filtered = filtered.filter(file => file.type === this.selectedType());
    }

    this.filteredFiles.set(filtered);
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
    this.applyFilters();
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedType.set(select.value);
    this.currentPage.set(1);
    this.applyFilters();
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
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
    if (!file.data) {
      console.error('No file data available');
      return;
    }
    const mimeTypes: { [key: string]: string } = {
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'xls': 'application/vnd.ms-excel',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'txt': 'text/plain',
      'csv': 'text/csv'
    };

    const mimeType = mimeTypes[file.type.toLowerCase()] || 'application/octet-stream';
    const blob = new Blob([file.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  deleteFile(file: File) {
    if (confirm('Are you sure you want to delete this file?')) {
      if (!file.id) return;
      this.dbService.deleteFile(file.id).subscribe({
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

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.loadFiles();
  }

  onUploadFile() {
    this.showUploadModal.set(true);
  }
} 