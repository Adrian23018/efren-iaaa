import { MoleculeChartSkeletonComponent } from './../../shared/molecules/chart-skeleton/chart-skeleton.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';

import { PeriodChangeEvent, PeriodFilter } from '@app/interfaces/metrics.model';
import { MetricsFilterComponent } from './metrics-filter/metrics-filter.component';
import { MetricsTabGeneralComponent } from './metrics-tab-general/metrics-tab-general.component';
import { MetricsTabAlertsComponent } from './metrics-tab-alerts/metrics-tab-alerts.component';
import { MetricsTabUsersComponent } from './metrics-tab-users/metrics-tab-users.component';
import { MetricsTabAdvancedComponent } from "./metrics-tab-advanced/metrics-tab-advanced.component";
import { MoleculeTabsComponent } from '@app/shared/molecules/tabs/tabs.component';
import { Tab } from '@app/interfaces/tabs.model';
import { MetricsFilter } from './metrics-filter/metrics-filter.model';
import { MetricsService } from './metrics.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Metrics } from '@app/interfaces/metrics-data.model';
import { DateUtil } from '@app/shared/utils/dateUtil';
import { MoleculeChartSkeletonAlertsComponent } from '@app/shared/molecules/chart-skeleton-alerts/chart-skeleton.component';
import { MoleculeChartSkeletonUsersComponent } from '@app/shared/molecules/chart-skeleton-users/chart-skeleton.component';
import { MetricsTabUsersGraficasComponent } from "./metrics-tab-users-graficas/metrics-tab-users-graficas.component";
import { MoleculeChartSkeletonUsersGraficaComponent } from '@app/shared/molecules/chart-skeleton-users-grafica/chart-skeleton-grafica.component';

@Component({
  selector: 'app-metrics',
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    MetricsFilterComponent,
    MoleculeTabsComponent,
    MetricsTabGeneralComponent,
    MetricsTabAlertsComponent,
    MetricsTabUsersComponent,
    MetricsTabAdvancedComponent,
    MoleculeChartSkeletonAlertsComponent,
    MoleculeChartSkeletonUsersComponent,
    MetricsTabUsersGraficasComponent,
    MoleculeChartSkeletonUsersGraficaComponent

  ],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  activeTab: string = 'general';
  title: string = 'Métricas';
  loadingAlerts: boolean = false;

  selectedPeriod!: PeriodFilter;
  currentPeriodText: string = '';
  period: string = '7D';
  loadingUser: boolean = false;
  loadingUserGrafica: boolean = false;
  loadingAvance: boolean = false;
  page_actual: number = 0;
  weekMonth: any = [0, 0]
  flagWeekMonth: any = 'sin data';

  tabs: Tab[] = [
    { id: 'general', label: 'General' },
    { id: 'alerts', label: 'Alertas Tempranas' },
    { id: 'users', label: 'Métricas de Usuarios' },
    { id: 'advanced', label: 'Métricas Avanzadas' }
  ];

  metrics!: any;
  metricalerts: any = '';
  metricaUsers: any = '';
  metricaUsersGraficas: any = '';
  metricsAvance: any = '';

  metricFilter: MetricsFilter = {
    period: '7D',
    type: 1,
    formControlName: 'period'
  }
  formMetrics!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly metricsService: MetricsService,
  ) {
    this.formMetrics = this.formBuilder.group({
      period: ['7D'],
      type: [1]
    });
    this.metricFilter.formGroup = this.formMetrics;

    // this.loadMetrics();
  }

  loadMetrics() {
    this.metricsService.getMetrics(this.metricFilter.period, this.metricFilter.type).subscribe({
      next: (data: Metrics) => {
        this.metrics = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
    // });
  }

  activeTabType(type: any) {
    this.activeTab = type;

    switch (this.activeTab) {
      case "general":
        this.loadMetricsTabs(1);
        this.metricFilter.type = 1;
        break;
      case "alerts":
        this.loadMetricsTabs(2);
        this.metricFilter.type = 2;
        break;
      case "users":
        this.loadMetricsUsersPage(3, 1, 5,(this.weekMonth), this.flagWeekMonth);
        this.loadMetricsUsersPageGraficas(3, 1, 5);
        this.metricFilter.type = 3;
        break;
      case "advanced":
        this.loadMetricsAvance(4);
        this.metricFilter.type = 4;
        break;

      default: "general"
        this.loadMetricsTabs(1);
        this.metricFilter.type = 1;
        break;
    }
  }

  loadMetricsTabs(type: number) {
    this.metricFilter.type = type;
    this.loadingAlerts = true;
    this.metricsService.getMetricsAlerts(this.metricFilter.period, this.metricFilter.type).subscribe({
      next: (data: any) => {
        this.metricalerts = data;
        this.loadingAlerts = false;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  onExport() {
    console.log('Exportando datos...');
  }

  onPeriodChange(event: any) {
    // this.period = event;
    this.metricFilter.period = event;
    if (this.metricFilter.type == 3) {
      switch (this.metricFilter.period) {
        case 'TODAY':
          this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
          this.loadMetricsUsersPageGraficas(3, 1, 5);
          break;

        case '7D':
          this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
          this.loadMetricsUsersPageGraficas(3, 1, 5);
          break;

        case '30D':
          this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
          this.loadMetricsUsersPageGraficas(3, 1, 5);
          break;

        case '90D':
          this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
          this.loadMetricsUsersPageGraficas(3, 1, 5);
          break;

        case '365D':
          this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
          this.loadMetricsUsersPageGraficas(3, 1, 5);
          break;
      }
    } else if (this.metricFilter.type == 2) {
      switch (this.metricFilter.period) {
        case 'TODAY':
          this.loadMetricsTabs(2);
          break;

        case '7D':
          this.loadMetricsTabs(2);
          break;

        case '30D':
          this.loadMetricsTabs(2);
          break;

        case '90D':
          this.loadMetricsTabs(2);
          break;

        case '365D':
          this.loadMetricsTabs(2);
          break;
      }
    } else if (this.metricFilter.type == 4) {
      switch (this.metricFilter.period) {
        case 'TODAY':
          this.loadMetricsAvance(4);
          break;

        case '7D':
          this.loadMetricsAvance(4);
          break;

        case '30D':
          this.loadMetricsAvance(4);
          break;

        case '90D':
          this.loadMetricsAvance(4);
          break;

        case '365D':
          this.loadMetricsAvance(4);
          break;
      }
    } else {
      switch (this.metricFilter.period) {
        case 'TODAY':
          this.loadMetrics();
          break;

        case '7D':
          this.loadMetrics();
          break;

        case '30D':
          this.loadMetrics();
          break;

        case '90D':
          this.loadMetrics();
          break;

        case '365D':
          this.loadMetrics();
          break;
      }
    }


  }


  loadMetricsUsers(type: number) {
    this.metricFilter.type = type;
    this.metricsService.getMetricsUsersData(this.metricFilter.period, this.metricFilter.type, 1, 5, [0, 0], false).subscribe({
      next: (data: any) => {
        this.metricaUsers = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  loadMetricsUsersPage(type: number, page: number, limit: number, filter: any, flag: any) {
    this.loadingUser = true;
    this.page_actual = page;
    console.log("page padre:", page);

    this.metricFilter.type = type;
    this.metricsService.getMetricsUsersData(this.metricFilter.period, this.metricFilter.type, page, limit, filter, flag).subscribe({
      next: (data: any) => {
        this.metricaUsers = data;
        console.log("app-metrics-tab-users ***:", this.metricaUsers);
        this.loadingUser = false;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  pageUser(event_page: any) {
    console.log("event_page", event_page);

    this.loadMetricsUsersPage(3, event_page.page, event_page.limit, (this.weekMonth), this.flagWeekMonth);
  }

  filters(event: any) {
    console.log("filter", event);
    this.weekMonth = (event.flag == true) ? event.semana : event.mes
    this.flagWeekMonth = (event.flag == true) ? 'semana' : 'mes';
    this.loadMetricsUsersPage(3, 1, 5, (this.weekMonth), this.flagWeekMonth);
  }

  loadMetricsAvance(type: number) {
    this.loadingAvance = true;
    this.metricFilter.type = type;
    this.metricsService.getMetricsAvance(this.metricFilter.period, this.metricFilter.type).subscribe({
      next: (data: any) => {
        this.metricsAvance = data;
        this.loadingAvance = false;
        console.log("test  :", this.metricsAvance);

      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  ///////////////////////////////////
  loadMetricsUsersGraficas(type: number) {
    this.metricFilter.type = type;
    this.metricsService.getMetricsUsersDataGrafica(this.metricFilter.period, this.metricFilter.type, 1, 5, false).subscribe({
      next: (data: any) => {
        this.metricaUsersGraficas = data;
        console.log("app-metrics-tab-users:", this.metricaUsersGraficas);

      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  loadMetricsUsersPageGraficas(type: number, page: number, limit: number) {
    this.loadingUserGrafica = true;
    this.metricFilter.type = type;
    this.metricsService.getMetricsUsersDataGrafica(this.metricFilter.period, this.metricFilter.type, page, limit, false).subscribe({
      next: (data: any) => {
        this.metricaUsersGraficas = data;
        console.log("app-metrics-tab-users ***:", this.metricaUsersGraficas);
        this.loadingUserGrafica = false;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
