import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IndexedDBService } from '../../../../services/indexed-db.service';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private dbService: IndexedDBService, private authService: AuthService) {}
  close() {
    this.closed.emit();
  }

  onFileSelected(event: Event) {
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

      this.dbService.addFile({
        name: this.selectedFile.name,
        type: this.selectedFile.name.split('.').pop()?.toLowerCase() || '',
        size: sizeInMB,
        url: '',
        data: this.selectedFile,
        user_id: currentUser?.id || '',
        overview: this.overview || 'No overview provided'
      }).subscribe(() => {
        this.close();
      });

      this.uploaded.emit();
    }
  }
}
