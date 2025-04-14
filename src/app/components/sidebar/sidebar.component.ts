import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ButtonModule,
    RippleModule,
    MenuModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi-th-large',
      routerLink: '/dashboard',
      selected: true
    },
    {
      label: 'Usuarios',
      icon: 'pi-users',
      routerLink: '/usuarios'
    },
    {
      label: 'Empresas',
      icon: 'pi-building',
      routerLink: '/empresas'
    },
    {
      label: 'Métricas',
      icon: 'pi-chart-bar',
      routerLink: '/metricas'
    },
    {
      label: 'Expedientes',
      icon: 'pi-folder',
      routerLink: '/expedientes'
    }
  ];
}
