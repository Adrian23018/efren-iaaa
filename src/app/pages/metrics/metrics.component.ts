import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';

import { MetricsTab, PeriodChangeEvent } from '@app/interfaces/metrics.model';
import { MetricsFilterComponent } from './metrics-filter/metrics-filter.component';
import { MetricsTabsComponent } from './metrics-tabs/metrics-tabs.component';
import { MetricsTabGeneralComponent } from './metrics-tab-general/metrics-tab-general.component';
import { MetricsTabAlertsComponent } from './metrics-tab-alerts/metrics-tab-alerts.component';

@Component({
  selector: 'app-metrics',
  imports: [
    CommonModule, 
    ButtonModule,
    CalendarModule,
    TabViewModule,
    FormsModule,
    MetricsFilterComponent,
    MetricsTabsComponent,
    MetricsTabGeneralComponent,
    MetricsTabAlertsComponent,
  ],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  activeTab: MetricsTab = 'general';
  title: string = 'Métricas';

  tabs = [
    { id: 'general', label: 'General' },
    { id: 'alerts', label: 'Alertas Tempranas' },
    { id: 'users', label: 'Métricas de Usuarios' },
    { id: 'advanced', label: 'Métricas Avanzadas' }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId as MetricsTab;
    // this.tabChange.emit(this.activeTab);
  }

  onExport() {
    console.log('Exportando datos...');
  }

  onPeriodChange(event: PeriodChangeEvent) {
    console.log('Período cambiado:', event);
  }

  onTabChange(tab: MetricsTab) {
    this.activeTab = tab;
    console.log('Tab cambiado:', tab);
  }
}
