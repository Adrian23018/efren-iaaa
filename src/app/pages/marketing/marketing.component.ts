import { ChangeDetectorRef, Component, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AlertsMetrics, EarlyAlerts, TypeButtonAlert } from '@app/interfaces/metrics.model';
import { AtomCardStatisticComponent } from '@app/shared/atoms/card-statistic/card-statistic.component';
// import { AtomTruncateTextComponent } from '@app/shared/atoms/truncate-text/truncate-text.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { UsersService } from '@app/pages/users/users.service';
import { MarketingService } from './marketing.service';

@Component({
  selector: 'app-marketing',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    DialogModule,
  ],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {
  earlyAlerts: any[] = [];
  loadingalerts: boolean = false;
  metrics: any = [];
  private usersService = inject(UsersService);
  mostrarModal: boolean = false;
  userviewCampan: any = [];
  public displayModal: boolean = false;
  user: any = '';

  actionTranslations: TypeButtonAlert = {
    contact: 'Contacto',
    verify: 'Verificar',
    notify: 'Notificar',
    remind: 'Recordar',
    toSurvey: 'Encuestar',
  }

  statistics: any = [
    {
      id: 'activeAlerts',
      title: 'Alertas activas',
      value: '',
      iconClass: 'pi pi-exclamation-triangle',
      iconBgClass: 'bg-red-500',
      loading: false,
    },
    {
      id: 'affectedUsers',
      title: 'Usuarios afectados',
      value: '',
      iconClass: 'pi pi-users',
      iconBgClass: 'bg-yellow-500',
      loading: false,
    },
    {
      id: 'valueAtRisk',
      title: 'Valor en riesgo',
      value: '',
      iconClass: 'pi pi-dollar',
      iconBgClass: 'bg-blue-500',
      loading: false,
      prefixValue: '$',
    },
  ];

  constructor(
    private readonly marketingService: MarketingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadMetricsTabs(2)
  }

  loadMetricsTabs(type: number) {
    this.marketingService.getMarketings().subscribe({
      next: (data: any) => {
        this.metrics = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  loadAlerts(): void {
    this.marketingService.getAlertsMetrics().subscribe({
      next: (data: AlertsMetrics) => {
        this.statistics = this.statistics.map((stat: any) => {
          const key = stat.id as keyof AlertsMetrics;
          if (key in data) {
            return {
              ...stat,
              value: data[key],
              loading: false,
            };
          }
          return stat;
        });
      },
      error: (err: any) => {
        console.log('Error', err);
      },
    });
  }

  // getEarliesAlerts(): void {
  //   this.earlyAlerts = this.metrics.earlyAlerts;
  // }

  // ngAfterViewInit() {
  //   this.loadingalerts = true;

  //   Promise.resolve().then(() => {
  //     this.earlyAlerts = this.metrics?.early_alerts;
  //     this.earlyAlerts = this.metrics?.early_alerts;

  //     this.loadingalerts = false;
  //     this.cdr.detectChanges();
  //   });
  // }


  translateAction(action: string): string {
    return this.actionTranslations[action as keyof TypeButtonAlert] || action;
  }

  viewUsers(users: any) {
    this.mostrarModal = true;
    this.loadAlertsModal(1, 5, users.users);
  }

  loadAlertsModal(page: number, limit: number, alert_users: any): void {
    this.userviewCampan = alert_users;
  }

  viewUsersData(id_user: any) {
    this.openUserDetail(id_user.id);
  }

  openUserDetail(user_id: any) {
    this.usersService.getUserId(user_id).data$.subscribe((result: any) => {
      this.user = result.data;
      this.displayModal = true;
    });

  }

  getFirstTwoUserNames(users: any[]): string {
    if (!Array.isArray(users)) return '';
    return users.slice(0, 2).map(u => u.name).join(', ');
  }

  getNamePlan(id_plan: number) {
    let namePlan = '';
    switch (id_plan) {
      case 1:
        namePlan = 'Élite';
        break;
      case 2:
        namePlan = 'Pro';
        break;
      case 3:
        namePlan = 'Demo';
        break;

      default:
        namePlan = 'Demo';
        break;
    }
    return namePlan;
  }

  exportToExcel(alerts: any) {
    const userIds: number[] = alerts.affectedUsers.map((user: any) => user.id);
    this.usersService.downloadCsvFile(userIds, alerts.tipo_alerta);
  }

}
