import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AtomCardStatisticComponent } from '@app/shared/atoms/card-statistic/card-statistic.component';
import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';
import { MetricsService } from '../metrics.service';
import { ChartMetrics, GeneralMetrics, PurchaseData } from '@app/interfaces/metrics.model';
import { ChartOptionsService } from '@app/shared/service/chart-options/chart-options.service';
import { MONTHS } from '@app/shared/constants';
import { ChartModule } from 'primeng/chart';
import { MoleculeChartSkeletonComponent } from '@app/shared/molecules/chart-skeleton/chart-skeleton.component';
import { TableModule } from 'primeng/table';

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
export class MetricsTabGeneralComponent {
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
      percentage: 8.2
    },
    {
      id: 'totalInteractions',
      title: 'Interacciones Totales',
      value: '',
      iconClass: 'pi pi-chart-line',
      iconBgClass: 'bg-indigo-500',
      loading: true,
      percentage: 12.5
    },
    {
      id: 'demoToPlan',
      title: 'Conversiones DEMO a Plan',
      value: '',
      iconClass: 'pi pi-user-plus',
      iconBgClass: 'bg-green-500',
      loading: true,
      sufixValue: '%',
      percentage: 5.7
    },
    {
      id: 'monthlyRevenue',
      title: 'Ingresos Mensuales',
      value: '',
      iconClass: 'pi pi-dollar',
      iconBgClass: 'bg-orange-500',
      loading: true,
      prefixValue: '$',
      percentage: 15.3,
      // sufixPercentage: 'este mes',
    },
  ];

  constructor(
    private readonly metricsService: MetricsService,
    private readonly chartOptionsService: ChartOptionsService,
  ) {}

  ngOnInit() {
    this.loadGeneralMetrics();
    this.initChartDataUsers();
    this.initChartDataIncomes();
    this.getPurcharses();
  }

  getPurcharses(): void {
    this.metricsService.getPurcharses().subscribe({
      next: (data: PurchaseData[]) => {
        this.purchaseData = data;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  loadGeneralMetrics(): void {
    this.metricsService.getGeneralMetrics().subscribe({
      next: (data: GeneralMetrics) => {
        this.statistics = this.statistics.map((stat) => {
          const key = stat.id as keyof GeneralMetrics;
          if (key in data) {
            return {
              ...stat,
              value: data[key],
              loading: false,
            };
          }
          return stat;
        });
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  initChartDataUsers() {
    this.metricsService.getGeneralUsers().subscribe({
      next: (data: ChartMetrics[]) => {
        const chartDataUsers = data.map((item) => ({
          month: MONTHS[new Date(item.date).getMonth()],
          value: item.value,
        }));

        this.chartDataUsers = {
          labels: chartDataUsers.map((item) => item.month),
          datasets: [
            {
              label: 'Usuarios',
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
        this.chartOptionsUsers = this.chartOptionsService.getLineChartOptions(maxDataValue, 'Usuarios', stepSize);
        this.loadingUsers = false;
      },
      error: (err) => {
        this.loadingUsers = false;
        console.log('Error', err);
      },
    });
  }

  initChartDataIncomes() {
    this.metricsService.getIncomes().subscribe({
      next: (data: ChartMetrics[]) => {
        const chartDataIncomes = data.map((item) => ({
          month: MONTHS[new Date(item.date).getMonth()],
          value: item.value,
        }));

        this.chartDataIncomes = {
          labels: chartDataIncomes.map((item) => item.month),
          datasets: [
            {
              label: 'Ingresos',
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
      },
      error: (err) => {
        this.loadingIncomes = false;
        console.log('Error', err);
      },
    });
  }
}
