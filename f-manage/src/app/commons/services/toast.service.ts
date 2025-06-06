import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast>({ message: '', type: 'success', show: false });
  toast$ = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.showToast(message, 'success');
  }

  showError(message: string) {
    this.showToast(message, 'error');
  }

  showInfo(message: string) {
    this.showToast(message, 'info');
  }

  private showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastSubject.next({ message, type, show: true });
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.toastSubject.next({ message: '', type: 'success', show: false });
  }
} 