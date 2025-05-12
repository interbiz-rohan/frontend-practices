import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then(m => m.AppComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./welcome/dashboard.component').then(m => m.DashboardComponent)
  }
];
