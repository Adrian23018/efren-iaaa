import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MetricsTab } from '@app/interfaces/metrics.model';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-metrics-tabs',
  imports: [
    CommonModule, 
    TabViewModule, 
    ButtonModule
  ],
  templateUrl: './metrics-tabs.component.html',
  styleUrl: './metrics-tabs.component.scss'
})
export class MetricsTabsComponent {
  @Output() tabChange = new EventEmitter<MetricsTab>();
  
  activeTab: MetricsTab = 'general';
  
  tabs = [
    { id: 'general', label: 'General' },
    { id: 'alerts', label: 'Alertas Tempranas' },
    { id: 'users', label: 'Métricas de Usuarios' },
    { id: 'advanced', label: 'Métricas Avanzadas' }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId as MetricsTab;
    this.tabChange.emit(this.activeTab);
  }
}
