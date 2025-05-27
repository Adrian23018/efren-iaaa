import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent) },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),canActivate: [AuthGuard] },
      { path: 'usuarios', loadComponent: () => import('./pages/users/users.component').then(c => c.UsersComponent),canActivate: [AuthGuard] },
      { path: 'empresas', loadComponent: () => import('./pages/companies/companies.component').then(c => c.CompaniesComponent),canActivate: [AuthGuard] },
      { path: 'metricas', loadComponent: () => import('./pages/metrics/metrics.component').then(c => c.MetricsComponent),canActivate: [AuthGuard] },
      { path: 'expedientes', loadComponent: () => import('./pages/files/files.component').then(c => c.FilesComponent),canActivate: [AuthGuard] },
      { path: 'marketing', loadComponent: () => import('./pages/marketing/marketing.component').then(c => c.MarketingComponent),canActivate: [AuthGuard] },

    ]
  }
];
