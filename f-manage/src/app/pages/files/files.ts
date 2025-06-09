import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../commons/components/header/header';
import { CustomTableComponent, TableColumn, TableAction } from '../../commons/components/custom-table/custom-table';
import { IndexedDBService, File } from '../../services/indexed-db.service';
import { UploadFileModal } from './components/upload/upload';
import { PageEvent } from '@angular/material/paginator';
import { FileCategory, FILE_CATEGORIES, filterFilesByCategory, getMimeType } from '../../commons/utils/file.utils';
import { switchMap, map, forkJoin, tap, mergeMap, from, toArray } from 'rxjs';
import { FooterComponent } from '../../commons/components/footer/footer';
import { ToastComponent } from '../../commons/components/toast-notification/toast-notification';
import { ToastService } from '../../commons/services/toast.service';
import { Layout } from '../../commons/components/layout/layout';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    // HeaderComponent, 
    CustomTableComponent, 
    UploadFileModal, 
    Layout,
    // FooterComponent,
    ToastComponent
  ],
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
  searchDate = signal<string>('');
  selectedType = signal<string>('');
  showUploadModal = signal<boolean>(false);
  selectedCategory = signal<FileCategory>('All');

  today = new Date().toISOString().split('T')[0];

  readonly FILE_CATEGORIES = FILE_CATEGORIES;

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
    { key: 'authorName', label: 'Author' },
    { key: 'created_on', label: 'Created On', type: 'date' }
  ];

  actions: TableAction[] = [
    {
      label: 'Download',
      action: 'download',
      class: 'download',
      icon: 'bi-cloud-download-fill'
    },
    {
      label: 'Delete',
      action: 'delete',
      class: 'delete',
      icon: 'bi-trash'
    }
  ];

  constructor(
    private authService: AuthService,
    private dbService: IndexedDBService,
    private toastService: ToastService
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

    files$.pipe(
      switchMap(files => {
        const filesWithAuthors$ = files.map(file => 
          this.dbService.getAuthorName(file.user_id).pipe(
            map(authorName => ({
              ...file,
              authorName
            }))
          )
        );
        console.log("filesWithAuthors$ values - ",filesWithAuthors$);
        return forkJoin(filesWithAuthors$);
        // return from(filesWithAuthors$).pipe(
        //   mergeMap(file$ => file$),
        //   toArray()
        // );
      }),
    ).subscribe({
      next: (files) => {
        // console.log("fork join files - ", files);
        this.files.set(files);
        this.applyFilters();

        this.currentPage.set(1);
      },
      error: (error) => {
        console.error('Error loading files:', error);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  applyFilters() {
    let filtered = this.files();
    
    // Apply category filter
    filtered = filterFilesByCategory(filtered, this.selectedCategory());
    
    // Apply search filter
    if (this.searchTerm()) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    // Apply date filter
    if (this.searchDate()) {
      const searchDate = new Date(this.searchDate());
      filtered = filtered.filter(file => {
        if (!file.created_on) return false;
        const fileDate = new Date(file.created_on);
        return fileDate.toDateString() === searchDate.toDateString();
      });
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

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchDate.set(input.value);
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
    
    const mimeType = getMimeType(file.type);
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
          this.toastService.showSuccess('File deleted successfully!');
          this.loadFiles();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          this.toastService.showError('Failed to delete file. Please try again.');
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  selectTab(category: FileCategory) {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
    this.applyFilters();
  }

  onUploadFile() {
    this.showUploadModal.set(true);
  }
} 