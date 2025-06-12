import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./toast-notification.html`,
  styleUrls: [`./toast-notification.scss`]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
} 