import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-detail" *ngIf="user">
      <h3>User Details</h3>
      <div class="detail-item">
        <strong>ID:</strong> {{ user.id }}
      </div>
      <div class="detail-item">
        <strong>Name:</strong> {{ user.name }}
      </div>
    </div>
  `,
  styles: [`
    .user-detail {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
      margin-top: 20px;
    }
    .detail-item {
      margin: 10px 0;
    }
  `]
})


export class UserDetailComponent {
  @Input() user: any;
} 