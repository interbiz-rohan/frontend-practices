import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container >
      <div class="loading-overlay" *ngIf="appService.isLoading()">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
      <ng-content></ng-content>
    </ng-container>
    <!-- <ng-container *ngIf="!appService.isLoading()">
      <ng-content></ng-content>
    </ng-container> -->
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-spinner {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      font-family: "Jaldi", sans-serif;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    p {
      margin: 0;
      color: #333;
      font-size: 16px;
    }
  `]
})
export class LoadingComponent {
  appService = inject(AppService);
} 