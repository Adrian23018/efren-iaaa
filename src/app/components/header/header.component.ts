import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  private router = inject(Router);
  
  ngOnInit() {
    this.items = [
      {
        label: 'Mi cuenta',
        icon: 'pi pi-user',
        command: () => {
          console.log('Mi cuenta');
        }
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        command: () => {
          console.log('Ajustes');
        }
      },
      { separator: true },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          console.log('Cerrar sesión');
          this.logout();
        }
      }
    ];
  }

  logout(){
    sessionStorage.removeItem('access_token');
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
