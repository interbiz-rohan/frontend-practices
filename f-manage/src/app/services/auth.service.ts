import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = new Observable<User | null>();

  constructor(private router: Router) {
    const storedUser = sessionStorage.getItem('currentUser');
    this.currentUserSubject.next(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      u.email === email && 
      u.password === password
    );

    if (user) {
      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
      
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }
} 