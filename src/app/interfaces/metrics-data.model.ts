export interface MetricsGeneral {
    totalUsers: number;
    totalInteractions: number;
    conversionsDemoToPlan: number;
    totalRevenue: number;
    totalUsersWithPlans: number;
    activePlans: number;
    proPurchases: number;
    proCancellations: number;
    elitePurchases: number;
    eliteCancellations: number;
}

export interface MetricsSelectedPlan {
    total: number;
    pro: number;
    elite: number;
}

export interface MetricsAlerts {
    proPlanNoInteraction3Days: number;
    elitePlanNoInteraction6Days: number;
    selectedPlanNoPurchase: MetricsSelectedPlan;
    termsNotAccepted: number;
    canceledServiceCount: number;
}

export interface MetricsUserMessages {
    avgMessages: number;
    totalMessages: number;
    activeUsersCount: number;
}

export interface MetricsUser {
    messagesMetrics: MetricsUserMessages;
    retentionRatePercent: number | null;
    renewalRatePercent: number;
}

export interface MetricsTopUtmSource {
    source: string;
    revenue: number;
    userCount: number;
}

export interface MetricsMessageUsage {
    planName: string;
    totalMessages: number;
    userCount: number;
    avgMessagesPerUser: number;
}

export interface MetricsAdvanced {
    topUtmSources: MetricsTopUtmSource[];
    messageUsageByPlan: MetricsMessageUsage[];
}

export interface MetricsPlans {
    pro: number;
    elite: number;
}

export interface MetricsMontlyIncome {
    date: string; 
    month: string; 
    value: number; 
}

export interface MetricsAccumulatedIncome {
    date: string; 
    month: string; 
    value: number; 
}

export interface MetricsMontlyPlans {
    period: string;
    proPurchases: number;
    proCancellations: number;
    elitePurchases: number;
    eliteCancellations: number;
}

export interface Metrics {
    startDate: string;
    endDate: string;
    intervalType: string;
    generalMetrics: MetricsGeneral;
    accumulatedIncome: MetricsAccumulatedIncome[];
    montlyIncome: MetricsMontlyIncome[];
    earlyAlerts: MetricsAlerts;
    userMetrics: MetricsUser;
    advancedMetrics: MetricsAdvanced;
    totalNetRevenue: number;
    plans: MetricsPlans;
    monthlyPlanActivity: MetricsMontlyPlans[];
}
