import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, Signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.model';

@Component({
  selector: 'app-companies',
  imports: [TableModule, ButtonModule, CommonModule, PaginatorModule, DialogModule, MenuModule,SkeletonModule ],
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
  public company: any = '';
  public menuItems: MenuItem[] = [];
  public showMenu: boolean = false;
  public totalRecords = 0; // Aquí debes poner el total real si lo tienes  
  isLoading = signal(true); // o simplemente: isLoading = true;

  @ViewChild('dt') dt!: Table;

  public myCompanies: { data$: Observable<Companies[]>; totalCompanies$: Observable<number>; isLoading: Signal<boolean> } =
    this.companyServices.getCompanies(1, 5);

  // Método de ejemplo para actualizar la lista de los usuarios
  refreshUsers(): void {
    this.myCompanies = this.companyServices.getCompanies(1, 5);
    this.cdr.detectChanges();
  }

  constructor() {
    this.myCompanies.totalCompanies$.subscribe(total => {
      console.log('Total usuarios:', total);
      this.totalUsuarios = total;
    });
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
    this.myCompanies = this.companyServices.getCompanies(page, limit);
    this.myCompanies.data$.subscribe(() => {
      setTimeout(() => {
        this.isLoading.set(false);
      }, 100);
    });  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt?.filterGlobal(input.value, 'contains');
  }

  openUserDetail(companyData: Companies) {
    this.company = companyData;
    this.displayModal = true;
  }

  toggleMenu(companyData: any) {
      companyData.showMenu = !companyData.showMenu;
  }

  viewFiles(companyData: any) {

  }

  enabledUser(companyData: any) {

  }

  closeModal(companyData: any): void {
    companyData.showMenu = false;
  }

}
