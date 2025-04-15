import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from './dashboard.service';
import { DashboardMetrics, DashboardUsers } from './dashboard.model';

import { CardStatisticComponent } from '@shared/atoms/card-statistic/card-statistic.component';
import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';
import { MONTHS } from '@app/shared/constants';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    ChartModule,
    CardStatisticComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chartData: any;
  chartOptions: any;
  alerts: any[] = [];

  metrics!: DashboardMetrics;

  statistics: CardStatistic[] = [
    {
      id: 'users',
      title: 'Total Usuarios',
      value: this.metrics?.users || '',
      iconClass: 'pi pi-users',
      iconBgClass: 'bg-primary',
      loading: true,
    },
    {
      id: 'companies',
      title: 'Total Empresas',
      value: this.metrics?.companies || '',
      iconClass: 'pi pi-building',
      iconBgClass: 'bg-green-500',
      loading: true,
    },
    {
      id: 'interactions',
      title: 'Interacciones',
      value: this.metrics?.interactions || '',
      iconClass: 'pi pi-chart-line',
      iconBgClass: 'bg-indigo-500',
      loading: true,
    },
    {
      id: 'monthlyIncome',
      title: 'Ingresos Mensuales',
      value: this.metrics?.monthlyIncome || '',
      iconClass: 'pi pi-dollar',
      iconBgClass: 'bg-orange-500',
      loading: true,
      prefixValue: '$',
    },
  ];

  constructor(private readonly dashboardService: DashboardService) {
    this.alerts = [
      {
        id: 'AL-4491C',
        user: {
          name: 'Daniel Padilla',
          email: 'daniel@ejemplo.com',
        },
        plan: 'Plan Elite',
        type: 'Inactividad',
        priority: 'Alta',
      },
      {
        id: 'AL-4492C',
        user: {
          name: 'María Rodríguez',
          email: 'maria@ejemplo.com',
        },
        plan: 'Plan Básico',
        type: 'Error de pago',
        priority: 'Media',
      },
      {
        id: 'AL-4493C',
        user: {
          name: 'Jorge Méndez',
          email: 'jorge@ejemplo.com',
        },
        plan: 'Plan Pro',
        type: 'Soporte',
        priority: 'Baja',
      },
    ];
  }

  ngOnInit() {
    this.loadMetrics();
    this.initChartData();
  }

  loadMetrics(): void {
    this.dashboardService.getMetrics().subscribe({
      next: (data: DashboardMetrics) => {
        this.metrics = data;
        this.statistics = this.statistics.map((stat) => {
          const key = stat.id as keyof DashboardMetrics;
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

  initChartData() {
    this.dashboardService.getUsers().subscribe({
      next: (data: DashboardUsers[]) => {
        const chartData = data.map((item) => ({
          month: MONTHS[new Date(item.date).getMonth()],
          totalUsers: item.totalUsers,
        }));

        this.chartData = {
          labels: chartData.map((item) => item.month),
          datasets: [
            {
              label: 'Usuarios',
              data: chartData.map((item) => item.totalUsers),
              fill: true,
              backgroundColor: 'rgba(33, 100, 243, 0.1)',
              borderColor: 'rgba(33, 100, 243, 1)',
              tension: 0.4,
            },
          ],
        };

        const maxDataValue = Math.max(
          ...chartData.map((item) => item.totalUsers)
        );
        const stepSize = Math.ceil(maxDataValue / 4);

        this.chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#495057',
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              min: 0,
              max: maxDataValue,
              ticks: {
                stepSize: stepSize > 0 ? stepSize : 1,
                color: '#495057',
              },
              title: {
                display: true,
                text: 'Usuarios',
                color: '#495057',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
            },
          },
        };
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
