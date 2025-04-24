export interface DashboardMetrics {
    companies: number;
    interactions: number;
    monthlyIncome: number;
    users: number;
    userElite: number;
    userPro: number;
    userDemo: number;
    userCanceled: number;
    userPendingCanceled: number;
}

export type PeriodFilter = 'TODAY' | '7D' | '30D' | '90D' | '365D' | 'custom';
// export type MetricsTab = 'general' | 'alerts' | 'users' | 'advanced';

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

export interface UserMetric {
    name: string;
    email?: string;
    phone: string;
    plan: string;
    startDate: string;
    weeklyInteractions: number;
    monthlyInteractions: number;
    status: string;
}

export interface Stats {
    label: string; 
    value: string;
}
export interface PlanStats {
    name: string;
    activeUsers: number;
    percentage: number;
    color: string;
    stats: Stats[];
}
 
export interface MessageUsage {
    plan: string;
    averageMessages: number;
    averageUsageTime: string;
    limitPercentage: number;
}

export interface PurcharseSource {
    source: string;
    percentage: number;
}