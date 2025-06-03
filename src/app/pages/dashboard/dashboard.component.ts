import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DashboardService } from './dashboard.service';
import { DashboardIncomes, DashboardUsers } from './dashboard.model';

import { AtomCardStatisticComponent } from '@shared/atoms/card-statistic/card-statistic.component';
import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';
import { MONTHS } from '@app/shared/constants';
import { ChartOptionsService } from '@app/shared/service/chart-options/chart-options.service';
import { AtomTruncateTextComponent } from '@app/shared/atoms/truncate-text/truncate-text.component';
import { Alert } from '@app/interfaces/alert.model';
import { MoleculeAlertDetailDialogComponent } from '@app/shared/molecules/alert-detail-dialog/alert-detail-dialog.component';
import { MoleculeChartSkeletonComponent } from '@app/shared/molecules/chart-skeleton/chart-skeleton.component';
import { DashboardMetrics } from '@app/interfaces/metrics.model';
import { getStatistics, getStatisticsUsers, getStatisticsStatus } from './dashboard-statistics.data';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    ChartModule,
    DialogModule,
    AtomCardStatisticComponent,
    AtomTruncateTextComponent,
    MoleculeAlertDetailDialogComponent,
    MoleculeChartSkeletonComponent,
    PaginatorModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chartDataUsers: any;
  chartOptionsUsers: any;
  chartDataIncomes: any;
  chartOptionsIncomes: any;
  alerts: Alert[] = [];
  alertsModal: any = [];
  alertsModalLength: any = 5;

  displayModal: boolean = false;
  selectedAlert!: Alert;
  mostrarModal: boolean = false;

  metrics!: DashboardMetrics;
  statistics: CardStatistic[] = getStatistics();
  statisticsUsers: CardStatistic[] = getStatisticsUsers();
  statisticsStatus: CardStatistic[] = getStatisticsStatus();
  loadingUsers: boolean = true;
  loadingIncomes: boolean = true;
  public first = 0;
  public rowsPerPage = 5;
  public userPendingCanceledPro: any = [];
  public userPendingCanceledElite: any = [];
  public viewModalElite = false;
  public viewModalPro = false;

  userCancelledAll: any = [];
  userCancelledAllPro: any = [];
  viewModalAll = false;
  viewModalAllPro = false;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly chartOptionsService: ChartOptionsService,
  ) { }

  ngOnInit() {
    this.loadMetrics();
    this.initChartDataUsers();
    this.loadAlerts();
    this.initChartDataIncomes();
  }

  loadMetrics(): void {
    this.dashboardService.getMetrics().subscribe({
      next: (data: DashboardMetrics) => {
        this.metrics = data;
        this.statistics = getStatistics(data);
        this.statisticsUsers = getStatisticsUsers(data);
        this.statisticsStatus = getStatisticsStatus(data);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  initChartDataUsers() {
    this.dashboardService.getUsers().subscribe({
      next: (data: DashboardUsers[]) => {
        const chartDataUsers = data.map((item) => ({
          month: MONTHS[new Date(item.date).getMonth()],
          totalUsers: item.totalUsers,
        }));

        this.chartDataUsers = {
          labels: chartDataUsers.map((item) => item.month),
          datasets: [
            {
              label: 'Usuarios',
              data: chartDataUsers.map((item) => item.totalUsers),
              fill: true,
              backgroundColor: 'rgba(33, 100, 243, 0.1)',
              borderColor: 'rgba(33, 100, 243, 1)',
              tension: 0.4,
            },
          ],
        };

        const maxDataValue = Math.max(
          ...chartDataUsers.map((item) => item.totalUsers)
        );
        const stepSize = Math.ceil(maxDataValue / 4);
        this.chartOptionsUsers = this.chartOptionsService.getLineChartOptions(maxDataValue, 'Usuarios', stepSize);
        this.loadingUsers = false;
      },
      error: (err) => {
        this.loadingUsers = false;
        console.log('Error', err);
      },
    });
  }

  loadAlerts(): void {
    this.dashboardService.getAlerts().subscribe({
      next: (data: Alert[]) => {
        this.alerts = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  initChartDataIncomes() {
    this.dashboardService.getIncomes().subscribe({
      next: (data: DashboardIncomes[]) => {
        const chartDataIncomes = data.map((item) => ({
          month: MONTHS[new Date(item.date).getMonth()],
          value: item.value,
        }));

        this.chartDataIncomes = {
          labels: chartDataIncomes.map((item) => item.month),
          datasets: [
            {
              label: 'Ingresos',
              data: chartDataIncomes.map((item) => item.value),
              fill: true,
              backgroundColor: '#CFF1E6',
              borderColor: '#10B981',
              tension: 0.4,
            },
          ],
        };

        const maxDataValue = Math.max(
          ...chartDataIncomes.map((item) => item.value)
        );
        const stepSize = Math.ceil(maxDataValue / 4);
        this.chartOptionsIncomes = this.chartOptionsService.getLineChartOptions(maxDataValue, 'Ingresos', stepSize);
        this.chartOptionsIncomes.plugins = {
          ...this.chartOptionsIncomes.plugins,
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.raw;
                return `$${value.toLocaleString()}`;
              },
            },
          },
        };
        this.chartOptionsIncomes.scales = {
          ...this.chartOptionsIncomes.scales,
          y: {
            ...this.chartOptionsIncomes.scales?.y,
            ticks: {
              callback: (value: number) => `$${value.toLocaleString()}`,
            },
          },
        };
        this.loadingIncomes = false;
      },
      error: (err) => {
        this.loadingIncomes = false;
        console.log('Error', err);
      },
    });
  }

  showAlertDetails(alert: Alert): void {
    this.selectedAlert = alert;
    this.displayModal = true;
  }

  viewAll() {
    this.mostrarModal = true;
    this.loadAlertsModal(1, 5);
  }


  loadAlertsModal(page: number, limit: number): void {
    this.dashboardService.getAlertsModal(page, limit).subscribe({
      next: (data: any) => {
        this.alertsModal = data.data;
        this.alertsModalLength = data.meta.totalAlerts;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  onPageChange(event: any) {
    this.first = event.first;         // posición del primer registro en la página
    this.rowsPerPage = event.rows;           // cuántos registros por página
    const page = event.page + 1;      // número de página (0 indexado)
    const limit = event.rows;         // cantidad por página

    this.loadAlertsModal(page, limit);
  }

  handleMetricClick(statistic: any) {
    switch (statistic.id) {
      case 'userscanceledtodayelite':
        this.cancelledElitePending();
        break;
      case 'userscanceledtodaypro':
        this.cancelledProPending();
        break;
      case 'userCanceledelite':
        this.cancelledAll();
        break;
      case 'userCanceledpro':
        this.cancelledAllPro();
        break;
      default:
    }
  }

  cancelledElitePending() {
    this.dashboardService.getAlertsModalEliteCancelledPending().subscribe((res: any) => {
      this.userPendingCanceledElite = res;
      this.viewModalElite = true;
    })
  }

  cancelledProPending() {
    this.dashboardService.getAlertsModalProCancelledPending().subscribe((res: any) => {
      this.userPendingCanceledPro = res;
      this.viewModalPro = true;
    })
  }

  cancelledAll() {
    this.dashboardService.getAlertsModalCancelledAllElite().subscribe((res: any) => {
      this.userCancelledAll = res;
      this.viewModalAll = true;
    })
  }

   cancelledAllPro() {
    this.dashboardService.getAlertsModalCancelledAllPro().subscribe((res: any) => {
      this.userCancelledAllPro = res;
      this.viewModalAllPro = true;
    })
  }

  getCancelationInfo(user: any): string {
    const canceledDate = new Date(user.canceled_at);
    const canceledAt = new Date(user.canceled_date);
    const hoy = new Date();
  
    const fechaCancelacion = canceledDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  
    const fechaEfectiva = canceledAt.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  
    const MILISEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    const diferenciaEnMs = canceledAt.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(diferenciaEnMs / MILISEGUNDOS_POR_DIA);
  
    return `Canceló el: ${fechaCancelacion} · Se cancela el: ${fechaEfectiva} / Faltan ${diasRestantes} días`;
  }
  
  
  

}
