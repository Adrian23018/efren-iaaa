import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { PeriodChangeEvent, PeriodFilter } from '@app/interfaces/metrics.model';
import { DateUtil } from '@app/shared/utils/dateUtil';
import { MetricsFilter } from './metrics-filter.model';

@Component({
  selector: 'app-metrics-filter',
  imports: [
    CommonModule, 
    ButtonModule, 
    CalendarModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './metrics-filter.component.html',
  styleUrl: './metrics-filter.component.scss'
})
export class MetricsFilterComponent {
  private _custom!: MetricsFilter;

  @Input()
  set custom(value: MetricsFilter) {
    this._custom = value;
    if (value?.period) {
      this.selectPeriod(value.period);
    }
  }

  get custom(): MetricsFilter {
    return this._custom;
  }

  @Output() periodChange = new EventEmitter<PeriodChangeEvent>();
  
  selectedPeriod!: PeriodFilter;
  currentPeriodText: string = '';

  selectPeriod(period: PeriodFilter) {
    this.selectedPeriod = period;
    this.custom?.formGroup?.get(this.custom.formControlName)?.setValue(period);
    
    const today = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'TODAY':
        this.currentPeriodText = DateUtil.formatDate(today);
        break;
        
      case '7D':
        startDate.setDate(today.getDate() - 6);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case '30D':
        startDate.setMonth(today.getMonth() - 1);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case '90D':
        startDate.setMonth(today.getMonth() - 3);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case '365D':
        startDate.setFullYear(today.getFullYear() - 1);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
    }
  }
}
