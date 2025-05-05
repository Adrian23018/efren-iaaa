import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, signal, Signal, ViewChild } from '@angular/core';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FileUserComponent } from '@app/shared/components/file-user/file-user.component';
import { MoleculeUserFilterPanelComponent } from '@app/shared/molecules/user-filter-panel/user-filter-panel.component';
import { UserFilterPanel } from '@app/shared/molecules/user-filter-panel/user-filter-panel.model';
import { CalendarModule } from 'primeng/calendar';

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
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SplitButtonModule,
    FileUserComponent,
    MoleculeUserFilterPanelComponent,
    CalendarModule,
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
  // isLoading = signal(true); // o simplemente: isLoading = true;
  public selectedSession: any = '';
  public display: boolean = false;

  filters: any = {
    name: '',
    plan: null,
    estado: null,
    periodo: null,
    tags: [],
    fechaInicio: null,
    fechaFin: null,
  };


  files = signal<any[]>([]);
  isLoading = signal(false);

  @ViewChild('dt') dt!: Table;

  public myUsers: { data$: Observable<Users[]>; totalUsers$: Observable<number>; isLoading: Signal<boolean> } =
    this.usersService.getUsers(1, 5, this.filters);

  formUsers!: FormGroup;
  filterParams: UserFilterPanel = {
    showSearch: true,
    searchConfig: {
      label: 'Buscar',
      placeholder: 'Buscar por nombre',
      formControlName: 'name'
    },
    showPlan: true,
    planConfig: {
      label: 'Plan',
      plans: [
        { label: 'Elite', value: 1 },
        { label: 'Pro', value: 2 },
        { label: 'Demo', value: 3 },
      ],
      formControlName: 'plan'
    },
    showStatus: true,
    statusConfig: {
      label: 'Estado',
      states: [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' },
      ],
      formControlName: 'status'
    },
    showPeriod: true,
    periodConfig: {
      label: 'Periodo',
      periods: [
        { label: 'Últimos 7 días', value: '7d' },
        { label: 'Últimos 30 días', value: '30d' },
        { label: 'Últimos 3 meses', value: '3m' },
        { label: 'Último año', value: '1y' }
      ],
      formControlName: 'period'
    },
    showTags: true,
    tagsConfig: {
      label: 'Etiquetas',
      tags: [
        { label: 'Términos aceptados', value: 'terminos-aceptados' },
        // { label: 'No compró Pro', value: 'no-compro-pro' },
        { label: 'Demo finalizada', value: 'demo-finalizada' },
        { label: 'Sin botones', value: 'sin-botones' },
        { label: 'No compró Pro', value: 'quedo-pro' },
        { label: 'No compró Élite', value: 'quedo-elite' },
        { label: 'No ha usado el Pro', value: 'pro-no-uso' },
        { label: 'No ha usado el Élite', value: 'elite-no-uso' },
        { label: 'No ha probado la Demo', value: 'no-prueba' },
        { label: 'No tiene ni data', value: 'no-datos' },
        { label: 'Se quedo a la Mitad de Demo', value: 'demo-mitad' },
        { label: 'Pro completado', value: 'pro-completado' },
        { label: 'Demo completado', value: 'demo-completada' }
      ],
      formControlName: 'tags'
    }
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formUsers = this.formBuilder.group({
      name: [''],
      plan: [''],
      status: [''],
      period: [''],
      searchDirect: [''],
      tags: [[]],// <-- ¡Este es el que permite que se envíen las etiquetas!
      fechaInicio: [null],
      fechaFin: [null],
    });
    this.filterParams.formGroupName = this.formUsers;

    this.formUsers.get('searchDirect')?.valueChanges
      .pipe(
        debounceTime(1300)
      )
      .subscribe(value => {
        this.formUsers.patchValue({
          name: value,
          // plan: null,
          // status: null,
          // period: null,
          // tags: [], // <-- ¡Este es el que permite que se envíen las etiquetas!
          // fechaInicio: null,
          // fechaFin: null,
        }, { emitEvent: false });
        this.applyFilters();
      });
  }

  // Método de ejemplo para actualizar la lista de los usuarios
  // refreshUsers(): void {
  //   this.myUsers = this.usersService.getUsers(1, 5, this.filters);
  //   this.cdr.detectChanges();
  // }

  // Cuando cambia de página
  onPageChange(event: any) {
    this.first = event.first;         // posición del primer registro en la página
    this.rowsPerPage = event.rows;           // cuántos registros por página
    const page = event.page + 1;      // número de página (0 indexado)
    const limit = event.rows;         // cantidad por página

    this.loadUsers(page, limit);
  }

  loadUsers(page: number, limit: number) {
    // this.myUsers = this.usersService.getUsers(page, limit, this.filters);
    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.myUsers = this.usersService.getUsers(page, limit, filters);
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

  viewFiles(user: any) {
    this.usersService.getUserIdFiles(user.user_id).data$.subscribe((result: any) => {
      this.selectedSession = result;
      this.display = true;
    });
  }

  enabledUser(userData: any) {
  }

  closeModal(userData: any): void {
    userData.showMenu = false;
  }

  clearFilters() {
    this.formUsers.patchValue({
      name: '',
      plan: null,
      status: null,
      period: null,
      tags: [],
      searchDirect: '',
      fechaInicio: null,
      fechaFin: null,
    }, { emitEvent: false });

    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.myUsers = this.usersService.getUsers(1, 5, filters);
  }

  applyFilters() {
    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.myUsers = this.usersService.getUsers(1, 5, filters);
  }

  // Método para cerrar el modal
  onCloseModal() {
    console.log("llega al padre");
    this.display = false;
  }

  filtrarPorFechas(): void {
    const filters = { ...this.formUsers.getRawValue() };

    if (filters.fechaInicio) {
      filters.fechaInicio = this.formatDateOnly(filters.fechaInicio);
    }

    if (filters.fechaFin) {
      filters.fechaFin = this.formatDateOnly(filters.fechaFin);
    }

    this.myUsers = this.usersService.getUsers(1, 5, filters);
  }

  private formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0]; // Devuelve "2025-04-01"
  }

  limpiarFiltros(): void {
    this.formUsers.patchValue({
      name: '',
      plan: null,
      status: null,
      period: null,
      tags: [],
      searchDirect: '',
      fechaInicio: null,
      fechaFin: null,
    }, { emitEvent: false });

    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.myUsers = this.usersService.getUsers(1, 5, filters);
  }
}
