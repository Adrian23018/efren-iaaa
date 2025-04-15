import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CardModule, ButtonModule, TableModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  chartData: any;
  chartOptions: any;
  alerts: any[] = [];

  constructor() {
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
    this.initChartData();
    this.initChartOptions();
  }

  initChartData() {
    this.chartData = {
      labels: ['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
      datasets: [
        {
          label: 'Usuarios',
          data: [110, 145, 165, 180, 150, 220, 240, 260, 290],
          fill: true,
          backgroundColor: 'rgba(33, 100, 243, 0.1)',
          borderColor: 'rgba(33, 100, 243, 1)',
          tension: 0.4
        }
      ]
    };
  }

  initChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 300,
          ticks: {
            stepSize: 75
          }
        }
      }
    };
  }
}
