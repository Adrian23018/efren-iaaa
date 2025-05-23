import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, Signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { debounceTime, Observable, Subject } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UsersService } from '../users/users.service';
import { FileUserComponent } from '@app/shared/components/file-user/file-user.component';

@Component({
  selector: 'app-companies',
  imports: [
    TableModule,
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
    InputGroupAddonModule,
    FileUserComponent,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

  private companyServices = inject(CompaniesService);
  private cdr = inject(ChangeDetectorRef);
  public first = 0;
  public rowsPerPage = 5;
  public totalUsuarios = 100;
  public displayModal: boolean = false;
  public displayModalUserID: boolean = false;
  public displayModalUsers: boolean = false;
  public company: any = '';
  public menuItems: MenuItem[] = [];
  public showMenu: boolean = false;
  public totalRecords = 0; // Aquí debes poner el total real si lo tienes  
  isLoading = signal(true); // o simplemente: isLoading = true;
  private searchInput$ = new Subject<string>();
  public companyUsers: any = [];
  public companyData: any = '';
  private usersService = inject(UsersService);
  public selectedSession: any = '';
  public user: any = '';
  public display: boolean = false;
  public filtro = '';

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

  public myCompanies: { data$: Observable<Companies[]>; totalCompanies$: Observable<number>; isLoading: Signal<boolean> } =
    this.companyServices.getCompanies(1, 5, this.filters);

  // Método de ejemplo para actualizar la lista de las compañías
  refreshCompanies(): void {
    this.myCompanies = this.companyServices.getCompanies(1, 5, this.filters);
    this.cdr.detectChanges();
  }

  constructor() {
    this.searchInput$
      .pipe(
        debounceTime(1300) // Espera 3 segundos desde el último evento
      )
      .subscribe(value => {
        this.filters.name = value;
        this.applyFilters(); // Ejecuta el filtro solo después del debounce
      });
  }

  // Cuando cambia de página
  onPageChange(event: any) {
    this.first = event.first;         // posición del primer registro en la página
    this.rowsPerPage = event.rows;           // cuántos registros por página
    const page = event.page + 1;      // número de página (0 indexado)
    const limit = event.rows;         // cantidad por página

    this.loadCompanmies(page, limit);
  }


  loadCompanmies(page: number, limit: number) {
    this.isLoading.set(true);
    this.myCompanies = this.companyServices.getCompanies(page, limit, this.filters);
    this.myCompanies.data$.subscribe(() => {
      setTimeout(() => {
        this.isLoading.set(false);
      }, 100);
    });
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt?.filterGlobal(input.value, 'contains');
  }

  openCompanyDetail(companyData: Companies) {
    this.company = companyData;
    this.displayModal = true;
  }

  toggleMenu(companyData: any) {
    companyData.showMenu = !companyData.showMenu;
  }

  enabledCompany(companyData: any) {

  }

  closeModal(companyData: any): void {
    companyData.showMenu = false;
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
    this.myCompanies = this.companyServices.getCompanies(1, 5, this.filters);
  }

  applyFilters() {
    this.isLoading.set(true);
    this.myCompanies = this.companyServices.getCompanies(1, 5, this.filters);
    this.cdr.detectChanges();
    // Aquí disparas tu fetch con los filtros
  }

  // Captura el input
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchInput$.next(input.value);
  }

  openCompanyUsers(companyData: any) {
    this.companyData = companyData;
    this.companyServices.getUsersCompany(companyData.id).subscribe((res: any) => {
      this.companyUsers = res.data;
      this.displayModalUsers = true;
    })
  }

  viewUsersData(id_user: any) {
    this.openUserDetail(id_user);
  }

  openUserDetail(user_id: any) {
    this.usersService.getUserId(user_id).data$.subscribe((result: any) => {
      this.user = result.data;
      this.displayModalUserID = true;
    });

  }

  viewFiles(user: any) {
    this.usersService.getUserIdFiles(user.user_id).data$.subscribe((result: any) => {
      this.selectedSession = result;
      this.display = true;
    });
  }

  // Método para cerrar el modal
  onCloseModal() {
    this.display = false;
  }

  //buscador de usuarios de una compañía
  get usuariosFiltrados() {
    const filtroLimpio = this.filtro?.toLowerCase() || '';
    return this.companyUsers.filter((u:any) =>
      (u.name?.toLowerCase() || '').includes(filtroLimpio) ||
      (u.email?.toLowerCase() || '').includes(filtroLimpio)
    );
  }


}
