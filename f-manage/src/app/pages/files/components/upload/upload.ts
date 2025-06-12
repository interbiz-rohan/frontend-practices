import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IndexedDBService } from '../../../../services/indexed-db.service';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { saveFile, FilePayload } from '../../../../shared/utils/file-operations';

@Component({
  selector: 'app-upload-file-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss'],
  standalone: true
})
export class UploadFileModal {
  selectedFile: File | null = null;
  @Output() closed = new EventEmitter<void>();
  overview: string = '';
  @Output() uploaded = new EventEmitter<void>();
  isSubmitting = false;

  constructor(private dbService: IndexedDBService, private authService: AuthService, private toastService: ToastService) {}
  close() {
    this.closed.emit();
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  removeFile() {
    this.selectedFile = null;
  }

  onSubmit() {
    if (this.selectedFile) {
      const currentUser = this.authService.currentUserValue;
      const sizeInMB = (this.selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';

      const filePayload: FilePayload = {
        name: this.selectedFile.name,
        type: this.selectedFile.name.split('.').pop()?.toLowerCase() || '',
        size: sizeInMB,
        data: this.selectedFile,
        user_id: currentUser?.id || '',
        overview: this.overview || 'No overview provided'
      };

      saveFile(this.dbService, filePayload).subscribe({
        next: () => {
          this.toastService.showSuccess('File uploaded successfully!');
          this.close();
          this.uploaded.emit();
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.toastService.showError('Failed to upload file. Please try again.');
        }
      });
    }
  }
}
