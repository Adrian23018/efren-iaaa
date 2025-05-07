import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ColorUtil } from '@app/shared/utils/colorUtil';
import { Metrics, MetricsMessageUsage } from '@app/interfaces/metrics-data.model';
import { MetricsService } from '../metrics.service';

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
  @Input() metrics!: any;
  matricsAvance: any = '';

  constructor(private readonly metricsService: MetricsService,
    private cdr: ChangeDetectorRef) {
  }

  // Purchase sources chart data
  purchaseSourcesData: any;
  purchaseSourcesOptions: any;

  // Message usage by plan
  messageUsage: MetricsMessageUsage[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metrics']) {
      this.initPurchaseSourcesChart();
      this.getMessageUsageByPlan();
    }
  }

  ngOnInit(): void {
    this.initPurchaseSourcesChart();
    this.getMessageUsageByPlan();
  }

  getMessageUsageByPlan() {
    this.messageUsage = this.metrics?.advanced_metrics?.message_usage_by_plan ?? [];
  }

  // initPurchaseSourcesChart() {
  //   const labels = this.metrics?.advancedMetrics?.topUtmSources?.map(item => item.source);
  //   const total = this.metrics?.advancedMetrics?.topUtmSources?.reduce((acc, item) => acc + (item.revenue + item.userCount), 0) || 0;
  //   if( total === 0 ) return;

  //   const values = this.metrics?.advancedMetrics?.topUtmSources?.map(item => ((item.revenue + item.userCount) / total) * 100);
  //   const colors = ColorUtil.generateColors(labels.length);

  //   this.purchaseSourcesData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         data: values,
  //         backgroundColor: colors,
  //         hoverBackgroundColor: colors.map(color => ColorUtil.adjustBrightness(color, -10))
  //       }
  //     ]
  //   };

  //   this.purchaseSourcesOptions = {
  //     plugins: {
  //       legend: {
  //         position: 'bottom'
  //       },
  //       title: {
  //         display: false
  //       }
  //     },
  //     responsive: true,
  //     maintainAspectRatio: false
  //   };
  // }


  ngAfterViewInit() {

    Promise.resolve().then(() => {
      this.matricsAvance = this.metrics;

      this.initPurchaseSourcesChart()
      this.cdr.detectChanges();
    });
  }


  initPurchaseSourcesChart() {
    const sources = this.metrics?.advanced_metrics?.top_utm_sources;

    if (!sources || sources.length === 0) return;

    const labels = sources.map((item: any) => `${item.source} (${item.user_count})`);
    const total = sources.reduce((acc: any, item: any) => acc + item.user_count, 0);

    if (total === 0) return;

    const values = sources.map((item: any) => ((item.user_count / total) * 100).toFixed(2));
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
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const label = context.label || '';
              const value = context.parsed;
              return `${label}: ${value}%`;
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }


}