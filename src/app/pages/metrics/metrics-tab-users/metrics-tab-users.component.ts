import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { PlanStats, UserMetric } from '@app/interfaces/metrics.model';
import { MetricsService } from '../metrics.service';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-metrics-tab-users',
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule,
    ChartModule, 
    CardModule, 
    DividerModule, 
  ],
  templateUrl: './metrics-tab-users.component.html',
  styleUrl: './metrics-tab-users.component.scss'
})
export class MetricsTabUsersComponent {
  users: UserMetric[] = [];
  plans: PlanStats[] = [];
  chartData: any;
  chartOptions: any;
  
  constructor(
    private readonly metricsService: MetricsService,
  ) {}

  ngOnInit() {
    this.getMetricsUsers();

    this.plans = [
      {
        name: 'Plan Pro',
        activeUsers: 345,
        percentage: 60,
        color: '#2196F3',
        stats: [
          { label: 'Promedio de uso', value: '45 mensajes/semana' },
          { label: 'Tasa de retención', value: '87%' },
          { label: 'Tasa de renovación', value: '72%' }
        ]
      },
      {
        name: 'Plan Élite',
        activeUsers: 178,
        percentage: 31,
        color: '#4CAF50',
        stats: [
          { label: 'Promedio de uso', value: '95 mensajes/semana' },
          { label: 'Tasa de retención', value: '92%' },
          { label: 'Tasa de renovación', value: '85%' }
        ]
      },
      {
        name: 'DEMO',
        activeUsers: 52,
        percentage: 9,
        color: '#FF9800',
        stats: [
          { label: 'Tasa de conversión a pago', value: '42%' },
          { label: 'Tiempo promedio en demo', value: '6 días' },
          { label: 'Plan más seleccionado', value: 'Pro (68%)' }
        ]
      }
    ];

    this.initChart();
  }

  getMetricsUsers(): void {
    this.metricsService.getMetricsUsers().subscribe({
      next: (data: UserMetric[]) => {
        this.users = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  getStatusSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    const statusSeverityMap: Record<string, "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined> = {
      'Activo': 'success',
      'Inactivo': 'secondary',
      'Demo activo': 'info',
      'Bajo uso': 'warn',
      'Error': 'danger',
    };

    return statusSeverityMap[status] ?? undefined;
  }

  initChart() {
    const labels = this.plans.map(plan => plan.name);
    const data = this.plans.map(plan => plan.activeUsers);
    const backgroundColors = this.plans.map(plan => plan.color);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors.map(color => this.adjustBrightness(color, -10))
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

  adjustBrightness(color: string, amount: number): string {
    return color;
  }
}
