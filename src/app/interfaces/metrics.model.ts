export interface DashboardMetrics {
    users: number;
    companies: number;
    interactions: number;
    monthlyIncome: number;
}

export type PeriodFilter = 'today' | 'last7days' | 'lastmonth' | 'lastquarter' | 'lastyear' | 'custom';
export type MetricsTab = 'general' | 'alerts' | 'users' | 'advanced';

export interface PeriodChangeEvent {
    period: PeriodFilter;
    dateRange?: { start: Date; end: Date };
}

export interface GeneralMetrics {
    totalUsers: number;
    totalInteractions: number;
    demoToPlan: number;
    monthlyRevenue: number;
}

export interface ChartMetrics {
    date: string;
    value: number;
}

export interface PurchaseData {
    period: string;
    proPurchases: number;
    proCancellations: number;
    elitePurchases: number;
    eliteCancellations: number;
}

export interface AlertsMetrics {
    activeAlerts: number;
    affectedUsers: number;
    valueAtRisk: number;
}
    
export interface EarlyAlerts {
    alertType: string;
    quantity: number;
    description: string;
    affectedUsers: string[];
    action: string;
}

export interface TypeButtonAlert {
    contact?: string;
    verify?: string;
    notify?: string;
    remind?: string;
    toSurvey?: string;
}