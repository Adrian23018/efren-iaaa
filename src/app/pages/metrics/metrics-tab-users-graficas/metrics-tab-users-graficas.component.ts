import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { PlanStats, UserMetric } from '@app/interfaces/metrics.model';
// import { MetricsService } from '../metrics.service';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ColorUtil } from '@app/shared/utils/colorUtil';
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-metrics-tab-users-graficas',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ChartModule,
    CardModule,
    DividerModule,
    PaginatorModule,
  ],
  templateUrl: './metrics-tab-users-graficas.component.html',
  styleUrl: './metrics-tab-users-graficas.component.scss'
})
export class MetricsTabUsersGraficasComponent {
  // users: UserMetric[] = [];
  // plans: PlanStats[] = [];
  plans: any[] = [];

  chartData: any;
  chartOptions: any;
  // @Input() metrics!: any;
  @Input() metricsGraficas!: any;
  users: any[] = [];
  public first = 0;
  public rowsPerPage = 5;
  public totalUser: number = 150;

  @Output() page_user = new EventEmitter<any>();

  constructor(
  ) { }


  getStatusSeverity(status: string): Severity {
    return TagUtil.getStatusSeverity(status);
  }

  initChart(user_metrics: any) {

    this.plans = [
      {
        name: 'Plan Pro',
        key: 'pro',
        color: '#1976D2',
        activeUsers: user_metrics.active_users.pro,
        percentage: Math.round((user_metrics.active_users.pro / user_metrics.active_users.total) * 100),
        stats: [
          { label: 'Promedio de uso', value: (user_metrics.usage_metrics.pro) ? user_metrics.usage_metrics.pro.avg_messages + ' mensaje/semana': 0 + ' mensaje/semana'},
          { label: 'Tasa de retención', value: (user_metrics.renewal_rates.pro) ? user_metrics.retention_rates.pro.toFixed(2) + '%' : 0 },
          { label: 'Tasa de renovación', value: (user_metrics.renewal_rates.pro) ? user_metrics.renewal_rates.pro.toFixed(2) + '%' : 0 }
        ]
      },
      {
        name: 'Plan Élite',
        key: 'elite',
        color: '#009688',
        activeUsers: user_metrics.active_users.elite,
        percentage: Math.round((user_metrics.active_users.elite / user_metrics.active_users.total) * 100),
        stats: [
          { label: 'Promedio de uso', value: user_metrics.usage_metrics.elite.avg_messages + ' mensajes/semana' },
          { label: 'Tasa de retención', value: (user_metrics.retention_rates.elite) ? user_metrics.retention_rates.elite.toFixed(2) + '%' : 0 },
          { label: 'Tasa de renovación', value: (user_metrics.renewal_rates.elite) ? user_metrics.renewal_rates.elite.toFixed(2) + '%' : 0 }
        ]
      },
      {
        name: 'DEMO',
        key: 'demo',
        color: '#FFA000',
        activeUsers: user_metrics.active_users.demo,
        percentage: Math.round((user_metrics.active_users.demo / user_metrics.active_users.total) * 100),
        stats: [
          { label: 'Tasa de conversión a pago', value: user_metrics.conversion_metrics.demo_to_paid_rate },
          { label: 'Tiempo promedio en demo', value: (user_metrics.conversion_metrics.avg_days_in_demo) ? user_metrics.conversion_metrics.avg_days_in_demo.toFixed(2) + ' días' : 0 },
          { label: 'Plan más seleccionado', value: 'Élite' }
        ]
      }
    ];


    const labels = this.plans.map(plan => plan.name);
    const data = this.plans.map(plan => plan.activeUsers);
    const backgroundColors = this.plans.map(plan => plan.color);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map(color => ColorUtil.adjustBrightness(color, -10))
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label ?? '';
              const value = context.raw ?? 0;
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} usuarios (${percentage}%)`;
            }
          }
        }
      },
      cutout: '40%',
      responsive: true,
      maintainAspectRatio: false
    };
  }


  // getEarliesAlerts(): void {
  //   this.totalUser = this.metrics.pagination_info.total_records;
  //   this.users = this.metrics.user_details;
  // }

  ngAfterViewInit() {
    setTimeout(() => {

      // this.users = this.metrics?.user_details;
      this.initChart(this.metricsGraficas?.user_metrics);

    }, 1500);

  }

  // Cuando cambia de página
  onPageChange(event: any) {
    this.first = event.first;         // posición del primer registro en la página
    this.rowsPerPage = event.rows;           // cuántos registros por página
    const page = event.page + 1;      // número de página (0 indexado)
    const limit = event.rows;

    this.page_user.emit({
      "page": page,
      "limit": limit
    });

    // this.loadUsers(page, limit);
  }

}
