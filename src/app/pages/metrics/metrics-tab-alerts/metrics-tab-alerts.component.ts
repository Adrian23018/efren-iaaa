import { ChangeDetectorRef, Component, inject, Input, SimpleChanges } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AlertsMetrics, EarlyAlerts, TypeButtonAlert } from '@app/interfaces/metrics.model';
import { AtomCardStatisticComponent } from '@app/shared/atoms/card-statistic/card-statistic.component';
// import { AtomTruncateTextComponent } from '@app/shared/atoms/truncate-text/truncate-text.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { UsersService } from '@app/pages/users/users.service';

@Component({
  selector: 'app-metrics-tab-alerts',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    // AtomTruncateTextComponent,
    AtomCardStatisticComponent,
    PaginatorModule,
    DialogModule,
  ],
  templateUrl: './metrics-tab-alerts.component.html',
  styleUrl: './metrics-tab-alerts.component.scss'
})
export class MetricsTabAlertsComponent {
  earlyAlerts: any[] = [];
  loadingalerts: boolean = false;
  @Input() metrics!: any;
  private usersService = inject(UsersService);
  mostrarModal: boolean = false;
  userviewAfect: any = [];
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
    private readonly metricsService: MetricsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  loadAlerts(): void {
    this.metricsService.getAlertsMetrics().subscribe({
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
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  getEarliesAlerts(): void {
    this.earlyAlerts = this.metrics.earlyAlerts;
  }

  ngAfterViewInit() {
    this.loadingalerts = true;

    Promise.resolve().then(() => {
      this.earlyAlerts = this.metrics?.early_alerts;
      this.earlyAlerts = this.metrics?.early_alerts;

      this.statistics[0].value = this.metrics.alertas_activas;
      this.statistics[1].value = this.metrics.usuarios_afectados;
      this.statistics[2].value = this.metrics.valor_en_riesgo;
      this.loadingalerts = false;
      this.cdr.detectChanges();
    });
  }


  translateAction(action: string): string {
    return this.actionTranslations[action as keyof TypeButtonAlert] || action;
  }

  viewUsers(alerts: any) {
    this.mostrarModal = true;
    this.loadAlertsModal(1, 5, alerts.affectedUsers);
  }

  loadAlertsModal(page: number, limit: number, alert_users: any): void {
    this.userviewAfect = alert_users;
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

  exportToExcel(alerts:any){
    const userIds: number[] = alerts.affectedUsers.map((user: any) => user.id);
    console.log("IDs de usuarios:", userIds);
    this.usersService.postUserIds(userIds).data$.subscribe((res:any)=>{
      
    })
  }

}
