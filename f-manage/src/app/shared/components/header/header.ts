import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader';
import { delay } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PageLoaderComponent]
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isAdmin = false;
  isLoading = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  async logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  async navigateWithLoader(route: string) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate([route]);
    }, 200);
  }
}