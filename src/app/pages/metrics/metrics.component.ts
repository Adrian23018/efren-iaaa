import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';

import { PeriodChangeEvent } from '@app/interfaces/metrics.model';
import { MetricsFilterComponent } from './metrics-filter/metrics-filter.component';
import { MetricsTabGeneralComponent } from './metrics-tab-general/metrics-tab-general.component';
import { MetricsTabAlertsComponent } from './metrics-tab-alerts/metrics-tab-alerts.component';
import { MetricsTabUsersComponent } from './metrics-tab-users/metrics-tab-users.component';
import { MetricsTabAdvancedComponent } from "./metrics-tab-advanced/metrics-tab-advanced.component";
import { MoleculeTabsComponent } from '@app/shared/molecules/tabs/tabs.component';
import { Tab } from '@app/interfaces/tabs.model';
import { MetricsFilter } from './metrics-filter/metrics-filter.model';
import { MetricsService } from './metrics.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Metrics } from '@app/interfaces/metrics-data.model';

@Component({
  selector: 'app-metrics',
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    MetricsFilterComponent,
    MoleculeTabsComponent,
    MetricsTabGeneralComponent,
    MetricsTabAlertsComponent,
    MetricsTabUsersComponent,
    MetricsTabAdvancedComponent,
],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  activeTab: string = 'general';
  title: string = 'Métricas';

  tabs: Tab[] = [
    { id: 'general', label: 'General' },
    { id: 'alerts', label: 'Alertas Tempranas' },
    { id: 'users', label: 'Métricas de Usuarios' },
    { id: 'advanced', label: 'Métricas Avanzadas' }
  ];

  metrics!: Metrics;
  metricFilter: MetricsFilter = {
    period: '7D',
    formControlName: 'period'
  }
  formMetrics!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly metricsService: MetricsService,
  ) {
    this.formMetrics = this.formBuilder.group({
      period: ['7D'],
    });
    this.metricFilter.formGroup = this.formMetrics;

    this.loadMetrics();
  }

  loadMetrics() {
    this.formMetrics.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged() 
      )
      .subscribe((value) => {
        this.metricsService.getMetrics(value.period).subscribe({
          next: (data: Metrics) => {
            this.metrics = data;
            console.log('Response:', this.metrics);
          },
          error: (err) => {
            console.log('Error', err);
          },
        });
      });
  }

  onExport() {
    console.log('Exportando datos...');
  }

  onPeriodChange(event: PeriodChangeEvent) {
    console.log('Período cambiado:', event);
  }
}
