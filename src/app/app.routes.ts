import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent) },
  { path: 'usuarios', loadComponent: () => import('./pages/users/users.component').then(c => c.UsersComponent) },
  { path: 'empresas', loadComponent: () => import('./pages/companies/companies.component').then(c => c.CompaniesComponent) },
  { path: 'metricas', loadComponent: () => import('./pages/metrics/metrics.component').then(c => c.MetricsComponent) },
  { path: 'expedientes', loadComponent: () => import('./pages/files/files.component').then(c => c.FilesComponent) }
];
