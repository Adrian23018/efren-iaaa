import { Component } from '@angular/core';
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
    // private readonly metricsService: MetricsService,
  ) {}

  ngOnInit() {
    // this.getMetricsUsers();
    // this.getMetricsPlans();
  }

  // getMetricsUsers(): void {
  //   this.metricsService.getMetricsUsers().subscribe({
  //     next: (data: UserMetric[]) => {
  //       this.users = data;
  //     },
  //     error: (err) => {
  //       console.log('Error', err);
  //     },
  //   });
  // }

  // getMetricsPlans(): void {
  //   this.metricsService.getMetricsPlans().subscribe({
  //     next: (data: PlanStats[]) => {
  //       this.plans = data;
  //       this.initChart();
  //     },
  //     error: (err) => {
  //       console.log('Error', err);
  //     },
  //   });
  // }

  getStatusSeverity(status: string): Severity{
    return TagUtil.getStatusSeverity(status);
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
  
}
