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

}
