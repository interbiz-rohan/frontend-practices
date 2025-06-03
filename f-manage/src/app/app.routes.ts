import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from './guards/auth.guard';
import { LoadingScreenComponent } from './pages/loading-screen/loading-screen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'loading', component: LoadingScreenComponent },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'files',
    loadComponent: () => import('./pages/files/files').then(m => m.FilesCompoenent),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then(m => m.Users),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
