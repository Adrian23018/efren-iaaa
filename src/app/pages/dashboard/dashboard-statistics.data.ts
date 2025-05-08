import { DashboardMetrics } from '@app/interfaces/metrics.model';
import { CardStatistic } from '@app/shared/atoms/card-statistic/card-statistic.model';

export const getStatistics = (metrics?: DashboardMetrics): CardStatistic[] => [
  {
    id: 'companies',
    title: 'Total Empresas',
    value: metrics?.companies ?? '',
    iconClass: 'pi pi-building',
    iconBgClass: 'bg-green-500',
    loading: !metrics,
  },
  {
    id: 'interactions',
    title: 'Interacciones',
    value: metrics?.interactions ?? '',
    iconClass: 'pi pi-chart-line',
    iconBgClass: 'bg-indigo-500',
    loading: !metrics,
  },
  {
    id: 'monthlyIncome',
    title: 'Ingresos Mensuales',
    value: metrics?.monthlyIncome ?? '',
    iconClass: 'pi pi-dollar',
    iconBgClass: 'bg-orange-500',
    loading: !metrics,
    prefixValue: '$',
  },
];

export const getStatisticsUsers = (metrics?: any): CardStatistic[] => [
  {
    id: 'userElite',
    title: 'Usuarios Élite',
    value: metrics?.userElite ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-primary',
    loading: !metrics,
  },
  {
    id: 'userPro',
    title: 'Usuarios Pro',
    value: metrics?.userPro ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-orange-500',
    loading: !metrics,
  },
  {
    id: 'userDemo',
    title: 'Usuarios Demo',
    value: metrics?.userDemo ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-green-500',
    loading: !metrics,
  },
];

export const getStatisticsStatus = (metrics?: any): CardStatistic[] => [
  {
    id: 'userCanceled',
    title: 'Usuarios Cancelados',
    value: metrics?.userCanceled ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-orange-500',
    loading: !metrics,
  },
  {
    id: 'userscanceledtodayelite',
    title: 'Usuarios Elite Pendientes de Cancelación',
    value: metrics?.userscanceledtodayelite ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-red-500',
    loading: !metrics,
    
  },
  {
    id: 'userscanceledtodaypro',
    title: 'Usuarios Pro Pendientes de Cancelación',
    value: metrics?.userscanceledtodaypro ?? '',
    iconClass: 'pi pi-users',
    iconBgClass: 'bg-red-500',
    loading: !metrics,
  },
];