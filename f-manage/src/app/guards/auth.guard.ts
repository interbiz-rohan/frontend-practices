import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requiredRole = route.data?.['role'];

    if (this.authService.isAuthenticated()) {
      if (requiredRole && requiredRole === 'admin' && !this.authService.isAdmin()) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
} 