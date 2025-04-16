import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { PeriodChangeEvent, PeriodFilter } from '@app/interfaces/metrics.model';
import { DateUtil } from '@app/shared/utils/dateUtil';

@Component({
  selector: 'app-metrics-filter',
  imports: [
    CommonModule, 
    ButtonModule, 
    CalendarModule, 
    FormsModule,
  ],
  templateUrl: './metrics-filter.component.html',
  styleUrl: './metrics-filter.component.scss'
})
export class MetricsFilterComponent {
  @Output() periodChange = new EventEmitter<PeriodChangeEvent>();
  
  selectedPeriod: PeriodFilter = 'last7days';
  currentPeriodText: string = '';

  ngOnInit() {
    this.selectPeriod('last7days');
    console.log("selectedPeriod", this.selectedPeriod);
    
  }

  selectPeriod(period: PeriodFilter) {
    this.selectedPeriod = period;
    
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();
    
    switch (period) {
      case 'today':
        this.currentPeriodText = DateUtil.formatDate(today);
        break;
        
      case 'last7days':
        startDate.setDate(today.getDate() - 6);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case 'lastmonth':
        startDate.setMonth(today.getMonth() - 1);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case 'lastquarter':
        startDate.setMonth(today.getMonth() - 3);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
        
      case 'lastyear':
        startDate.setFullYear(today.getFullYear() - 1);
        this.currentPeriodText = `${DateUtil.formatDate(startDate)} a ${DateUtil.formatDate(today)}`;
        break;
    }
    
    this.periodChange.emit(<PeriodChangeEvent>{
      period: this.selectedPeriod,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  }
}
