import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-copyright">
          © {{currentYear}} F-Manage. All rights reserved.
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 20px 0;
      position: fixed;
      bottom: 0;
      left: 0;
      min-height: 50px;
      width: 100%;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .footer-copyright {
      font-size: 16px;
      color: #999;
    }

    @media (max-width: 600px) {
      .footer {
        padding: 15px 0;
      }

      .footer-links {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .footer-logo-img {
        height: 30px;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 