import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AtomCardStatisticComponent } from '@app/shared/atoms/card-statistic/card-statistic.component';
import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';
import { MetricsService } from '../metrics.service';
import { ChartMetrics, GeneralMetrics, PurchaseData } from '@app/interfaces/metrics.model';
import { ChartOptionsService } from '@app/shared/service/chart-options/chart-options.service';
import { MONTHS } from '@app/shared/constants';
import { ChartModule } from 'primeng/chart';
import { MoleculeChartSkeletonComponent } from '@app/shared/molecules/chart-skeleton/chart-skeleton.component';
import { TableModule } from 'primeng/table';
import { Metrics, MetricsGeneral } from '@app/interfaces/metrics-data.model';

@Component({
  selector: 'app-metrics-tab-general',
  imports: [
    CommonModule,
    ChartModule,
    TableModule,
    AtomCardStatisticComponent,
    MoleculeChartSkeletonComponent,
  ],
  templateUrl: './metrics-tab-general.component.html',
  styleUrl: './metrics-tab-general.component.scss'
})
export class MetricsTabGeneralComponent implements OnChanges {
  @Input() metrics!: Metrics;

  chartDataUsers: any;
  chartOptionsUsers: any;
  chartDataIncomes: any;
  chartOptionsIncomes: any;

  loadingUsers: boolean = true;
  loadingIncomes: boolean = true;

  purchaseData: PurchaseData[] = [];

  statistics: CardStatistic[] = [
    {
      id: 'totalUsers',
      title: 'Total Usuarios',
      value: '',
      iconClass: 'pi pi-users',
      iconBgClass: 'bg-primary',
      loading: true,
    },
    {
      id: 'totalInteractions',
      title: 'Interacciones Totales',
      value: '',
      iconClass: 'pi pi-chart-line',
      iconBgClass: 'bg-indigo-500',
      loading: true,
    },
    {
      id: 'conversionsDemoToPlan',
      title: 'Conversiones DEMO a Plan',
      value: '',
      iconClass: 'pi pi-user-plus',
      iconBgClass: 'bg-green-500',
      loading: true,
      sufixValue: '%',
    },
    {
      id: 'totalRevenue',
      title: 'Ingresos Mensuales',
      value: '',
      iconClass: 'pi pi-dollar',
      iconBgClass: 'bg-orange-500',
      loading: true,
      prefixValue: '$',
    },
  ];

  constructor(
    private readonly chartOptionsService: ChartOptionsService,
  ) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metrics'] && !changes['metrics'].firstChange) {
      this.loadGeneralMetrics();
      this.initChartDataAcummulatedIncomes();
      this.initChartDataIncomes();
      this.getPurcharses();
    }
  }
  
  loadGeneralMetrics(): void {
    if(this.metrics?.generalMetrics){
      this.statistics = this.statistics.map((stat) => {
        const key = stat.id as keyof MetricsGeneral;
        if (key in this.metrics.generalMetrics) {
          return {
            ...stat,
            value: this.metrics.generalMetrics[key],
            loading: false,
          };
        }
        return stat;
      });
    }
  }

  getPurcharses(): void {
    this.purchaseData = this.metrics?.monthlyPlanActivity ?? [];
  }


  initChartDataIncomes() {
    const chartDataUsers = this.metrics?.montlyIncome?.map((item) => ({
      month: MONTHS[new Date(item.date).getMonth()],
      value: item.value,
    }));

    this.chartDataUsers = {
      labels: chartDataUsers.map((item) => item.month),
      datasets: [
        {
          label: 'Ingresos Mensuales',
          data: chartDataUsers.map((item) => item.value),
          fill: true,
          backgroundColor: 'rgba(33, 100, 243, 0.1)',
          borderColor: 'rgba(33, 100, 243, 1)',
          tension: 0.4,
        },
      ],
    };
    const maxDataValue = Math.max(
      ...chartDataUsers.map((item) => item.value)
    );
    const stepSize = Math.ceil(maxDataValue / 4);
    this.chartOptionsUsers = this.chartOptionsService.getLineChartOptions(maxDataValue, 'Ingresos USD', stepSize);
    this.chartOptionsUsers.plugins = {
      ...this.chartOptionsUsers.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    };
    this.chartOptionsUsers.scales = {
      ...this.chartOptionsUsers.scales,
      y: {
        ...this.chartOptionsUsers.scales?.y,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    };
    this.loadingUsers = false;
  }

  initChartDataAcummulatedIncomes() {
    const chartDataIncomes = this.metrics?.accumulatedIncome?.map((item) => ({
      month: MONTHS[new Date(item.date).getMonth()],
      value: item.value,
    }));

    this.chartDataIncomes = {
      labels: chartDataIncomes.map((item) => item.month),
      datasets: [
        {
          label: 'Ingresos Acumulados',
          data: chartDataIncomes.map((item) => item.value),
          fill: true,
          backgroundColor: '#CFF1E6',
          borderColor: '#10B981',
          tension: 0.4,
        },
      ],
    };

    const maxDataValue = Math.max(
      ...chartDataIncomes.map((item) => item.value)
    );
    const stepSize = Math.ceil(maxDataValue / 4);
    this.chartOptionsIncomes = this.chartOptionsService.getLineChartOptions(maxDataValue, 'Ingresos USD', stepSize);
    this.chartOptionsIncomes.plugins = {
      ...this.chartOptionsIncomes.plugins,
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    };
    this.chartOptionsIncomes.scales = {
      ...this.chartOptionsIncomes.scales,
      y: {
        ...this.chartOptionsIncomes.scales?.y,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    };
    this.loadingIncomes = false;
  }
}
