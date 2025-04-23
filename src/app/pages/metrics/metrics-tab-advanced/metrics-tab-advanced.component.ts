import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { MetricsService } from '../metrics.service';
import { MessageUsage, PurcharseSource } from '@app/interfaces/metrics.model';
import { ColorUtil } from '@app/shared/utils/colorUtil';

@Component({
  selector: 'app-metrics-tab-advanced',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ChartModule,
    DividerModule
  ],
  templateUrl: './metrics-tab-advanced.component.html',
  styleUrl: './metrics-tab-advanced.component.scss'
})
export class MetricsTabAdvancedComponent implements OnInit {
  // Purchase sources chart data
  purchaseSourcesData: any;
  purchaseSourcesOptions: any;
  
  // Message usage by plan
  messageUsage: MessageUsage[] = [];
  
  constructor(private readonly metricsService: MetricsService) {}
  
  ngOnInit() {
    this.initPurchaseSourcesChart();
    this.getMessageUsageByPlan();
  }

  getMessageUsageByPlan() {
    this.metricsService.getMessageUsageByPlan().subscribe({
      next: (messageUsage: MessageUsage[]) => {
        this.messageUsage = messageUsage;
      },
      error: (error: any) => {
        console.error('Error fetching messages usages by plan:', error);
      }
    });
  }
  
  initPurchaseSourcesChart() {
    // Fetch purchase sources data from service
    this.metricsService.getPurchaseSources().subscribe({
      next: (data: PurcharseSource[]) => {
        const labels = data.map(item => item.source);
        const values = data.map(item => item.percentage);
        
        // Use ColorUtil to generate dynamic colors
        const colors = ColorUtil.generateColors(labels.length);
        
        this.purchaseSourcesData = {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              hoverBackgroundColor: colors.map(color => ColorUtil.adjustBrightness(color, -10))
            }
          ]
        };
      },
      error: (error) => {
        console.error('Error fetching purchase sources:', error);
      }
    });
    
    this.purchaseSourcesOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
  
}