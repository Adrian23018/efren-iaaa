import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ColorUtil } from '@app/shared/utils/colorUtil';
import { Metrics, MetricsMessageUsage } from '@app/interfaces/metrics-data.model';

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
export class MetricsTabAdvancedComponent implements OnInit, OnChanges {
  @Input() metrics!: Metrics;
  
  // Purchase sources chart data
  purchaseSourcesData: any;
  purchaseSourcesOptions: any;
  
  // Message usage by plan
  messageUsage: MetricsMessageUsage[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metrics'] && !changes['metrics'].firstChange) {
      this.initPurchaseSourcesChart();
      this.getMessageUsageByPlan();
    }
  }

  ngOnInit(): void {
    this.initPurchaseSourcesChart();
    this.getMessageUsageByPlan();
  }

  getMessageUsageByPlan() {
    this.messageUsage = this.metrics?.advancedMetrics?.messageUsageByPlan ?? [];
  }
  
  initPurchaseSourcesChart() {
    const labels = this.metrics?.advancedMetrics?.topUtmSources?.map(item => item.source);
    const total = this.metrics?.advancedMetrics?.topUtmSources?.reduce((acc, item) => acc + (item.revenue + item.userCount), 0) || 0;
    if( total === 0 ) return;

    const values = this.metrics?.advancedMetrics?.topUtmSources?.map(item => ((item.revenue + item.userCount) / total) * 100);
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