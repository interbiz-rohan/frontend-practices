import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../services/indexed-db.service';
import { initializeDatabase } from '../../shared/initializers/db-initial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div class="loading-content">
        <h2>Initializing Database...</h2>
        <div class="spinner"></div>
        <p *ngIf="error" class="error">{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }
    .loading-content {
      text-align: center;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingScreenComponent implements OnInit {
  error: string | null = null;

  constructor(
    private router: Router,
    private dbService: IndexedDBService
  ) {}

  ngOnInit() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    initializeDatabase(this.dbService).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Database initialization failed:', err);
        this.error = 'Failed to initialize database. Please refresh the page.';
      }
    });
  }
} 