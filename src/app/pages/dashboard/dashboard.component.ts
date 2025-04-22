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

  displayModal: boolean = false;
  selectedAlert!: Alert;

  metrics!: DashboardMetrics;
  statistics: CardStatistic[] = getStatistics();
  statisticsUsers: CardStatistic[] = getStatisticsUsers();
  statisticsStatus: CardStatistic[] = getStatisticsStatus();
  loadingUsers: boolean = true;
  loadingIncomes: boolean = true;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly chartOptionsService: ChartOptionsService,
  ) {}

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
}
