import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, map, tap, catchError, of } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';
import { User } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private indexedDBService: IndexedDBService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.indexedDBService.getUserByEmail(email).pipe(
      map(user => {
        if (user && user.password === password) {
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user && !this.currentUserValue) {
      this.currentUserSubject.next(JSON.parse(user));
    }
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }
} 