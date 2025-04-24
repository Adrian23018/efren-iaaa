import { Component } from '@angular/core';
// import { MetricsService } from '../metrics.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';
import { AlertsMetrics, EarlyAlerts, TypeButtonAlert } from '@app/interfaces/metrics.model';
import { AtomCardStatisticComponent } from '@app/shared/atoms/card-statistic/card-statistic.component';
import { AtomTruncateTextComponent } from '@app/shared/atoms/truncate-text/truncate-text.component';

@Component({
  selector: 'app-metrics-tab-alerts',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    AtomTruncateTextComponent,
    AtomCardStatisticComponent,
  ],
  templateUrl: './metrics-tab-alerts.component.html',
  styleUrl: './metrics-tab-alerts.component.scss'
})
export class MetricsTabAlertsComponent {
  earlyAlerts: EarlyAlerts[] = [];

  actionTranslations: TypeButtonAlert = {
    contact: 'Contacto',
    verify: 'Verificar',
    notify: 'Notificar',
    remind: 'Recordar',
    toSurvey: 'Encuestar',
  }

  statistics: CardStatistic[] = [
    {
      id: 'activeAlerts',
      title: 'Alertas activas',
      value: '',
      iconClass: 'pi pi-exclamation-triangle',
      iconBgClass: 'bg-red-500',
      loading: true,
    },
    {
      id: 'affectedUsers',
      title: 'Usuarios afectados',
      value: '',
      iconClass: 'pi pi-users',
      iconBgClass: 'bg-yellow-500',
      loading: true,
    },
    {
      id: 'valueAtRisk',
      title: 'Valor en riesgo',
      value: '',
      iconClass: 'pi pi-dollar',
      iconBgClass: 'bg-blue-500',
      loading: true,
      prefixValue: '$',
    },
  ];

  constructor(
    // private readonly metricsService: MetricsService,
  ) {}

  ngOnInit() {
    // this.loadAlerts();
    // this.getEarliesAlerts();
  }

  loadAlerts(): void {
    // this.metricsService.getAlertsMetrics().subscribe({
    //   next: (data: AlertsMetrics) => {
    //     this.statistics = this.statistics.map((stat) => {
    //       const key = stat.id as keyof AlertsMetrics;
    //       if (key in data) {
    //         return {
    //           ...stat,
    //           value: data[key],
    //           loading: false,
    //         };
    //       }
    //       return stat;
    //     });
    //   },
    //   error: (err) => {
    //     console.log('Error', err);
    //   },
    // });
  }

  getEarliesAlerts(): void {
    // this.metricsService.getEarliesAlerts().subscribe({
    //   next: (data: EarlyAlerts[]) => {
    //     this.earlyAlerts = data;
    //   },
    //   error: (err) => {
    //     console.log('Error', err);
    //   },
    // });
  }

  translateAction(action: string): string {
    return this.actionTranslations[action as keyof TypeButtonAlert] || action;
  }
}
