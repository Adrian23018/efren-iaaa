import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, Signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { debounceTime, Observable, Subject } from 'rxjs';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip'; // ✅ ESTE es el correcto
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


@Component({
  selector: 'app-users',
  imports: [TableModule,
    ButtonModule,
    CommonModule,
    PaginatorModule,
    DialogModule,
    MenuModule,
    SkeletonModule,
    OverlayPanelModule,
    InputTextModule,
    ChipModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  private usersService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);
  public first = 0;
  public rowsPerPage = 5;
  public displayModal: boolean = false;
  public user: any = '';
  public menuItems: MenuItem[] = [];
  public showMenu: boolean = false;
  isLoading = signal(true); // o simplemente: isLoading = true;
  private searchInput$ = new Subject<string>();


  filters: any = {
    name: '',
    plan: null,
    estado: null,
    periodo: null
  };

  periodos = [
    { label: 'Últimos 7 días', value: '7d' },
    { label: 'Últimos 30 días', value: '30d' },
    { label: 'Últimos 3 meses', value: '3m' },
    { label: 'Último año', value: '1y' }
  ];

  @ViewChild('dt') dt!: Table;

  public myUsers: { data$: Observable<Users[]>; totalUsers$: Observable<number>; isLoading: Signal<boolean> } =
    this.usersService.getUsers(1, 5, this.filters);

    constructor(){
      this.searchInput$
    .pipe(
      debounceTime(1300) // Espera 3 segundos desde el último evento
    )
    .subscribe(value => {
      this.filters.name = value;
      this.applyFilters(); // Ejecuta el filtro solo después del debounce
    });
    }

  // Método de ejemplo para actualizar la lista de los usuarios
  refreshUsers(): void {
    this.myUsers = this.usersService.getUsers(1, 5, this.filters);
    this.cdr.detectChanges();
  }

  // Cuando cambia de página
  onPageChange(event: any) {
    this.first = event.first;         // posición del primer registro en la página
    this.rowsPerPage = event.rows;           // cuántos registros por página
    const page = event.page + 1;      // número de página (0 indexado)
    const limit = event.rows;         // cantidad por página

    this.loadUsers(page, limit);
  }

  loadUsers(page: number, limit: number) {
    this.isLoading.set(true);
    this.myUsers = this.usersService.getUsers(page, limit, this.filters);
    this.myUsers.data$.subscribe(() => {
      setTimeout(() => {
        this.isLoading.set(false);
      }, 100);
    });
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt?.filterGlobal(input.value, 'contains');
  }

  openUserDetail(userData: any) {
    this.user = userData;
    this.displayModal = true;
  }

  toggleMenu(userData: any) {
    userData.showMenu = !userData.showMenu;
  }

  viewFiles(userData: any) {

  }

  enabledUser(userData: any) {

  }

  closeModal(userData: any): void {
    userData.showMenu = false;
  }

  toggleFilter(key: string, value: any) {
    this.filters[key] = this.filters[key] === value ? null : value;
  }

  clearFilters() {
    this.filters = {
      name: '',
      plan: null,
      estado: null,
      periodo: null
    };
    this.myUsers = this.usersService.getUsers(1, 5, this.filters);
  }

  applyFilters() {
    this.isLoading.set(true);
    this.myUsers = this.usersService.getUsers(1, 5, this.filters);
    this.cdr.detectChanges();
    // Aquí disparas tu fetch con los filtros
  }

  // Captura el input
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchInput$.next(input.value);
  }

}
