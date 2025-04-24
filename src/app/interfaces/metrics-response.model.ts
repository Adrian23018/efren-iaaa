export interface MetricsGeneralResponse {
    total_users: number;
    total_interactions: number;
    conversions_demo_to_plan: number;
    total_revenue: number;
    total_users_with_plans: number;
    active_plans: number;
    pro_purchases: number;
    pro_cancellations: number;
    elite_purchases: number;
    elite_cancellations: number;
}

export interface MetricsSelectedPlanResponse {
    total: number;
    pro: number;
    elite: number;
}

export interface MetricsAlertsResponse {
    pro_plan_no_interaction_3days: number;
    elite_plan_no_interaction_6days: number;
    selected_plan_no_purchase: MetricsSelectedPlanResponse;
    terms_not_accepted: number;
    canceled_service_count: number;
}

export interface MetricsUserMessagesResponse {
    avg_messages: number;
    total_messages: number;
    active_users_count: number;
}

export interface MetricsUserResponse {
    messages_metrics: MetricsUserMessagesResponse;
    retention_rate_percent: number | null;
    renewal_rate_percent: number;
}

export interface MetricsTopUtmSourceResponse {
    source: string;
    revenue: number;
    user_count: number; 
}

export interface MetricsMessageUsageResponse {
    plan_name: string;
    total_messages: number;
    user_count: number;
    avg_messages_per_user: number;
}

export interface MetricsAdvancedResponse {
    top_utm_sources: MetricsTopUtmSourceResponse[];
    message_usage_by_plan: MetricsMessageUsageResponse[];
}

export interface MetricsPlansResponse {
    pro: number;
    elite: number;
}

export interface MetricsMontlyIncomeResponse {
    periodo_str: string; 
    mes_abbr: string; 
    monto_total_mes: number; 
}

export interface MetricsAccumulatedIncomeResponse {
    periodo_str: string; 
    mes_abbr: string; 
    monto_acumulado: number; 
}

export interface MetricsMontlyPlansResponse {
    period: string;
    proPurchases: number;
    proCancellations: number;
    elitePurchases: number;
    eliteCancellations: number;
}

export interface MetricsResponse {
    start_date: string;
    end_date: string;
    interval_type: string;
    general_metrics: MetricsGeneralResponse;
    ingresosAcumulados: MetricsAccumulatedIncomeResponse[];
    ingresosMensuales: MetricsMontlyIncomeResponse[];
    early_alerts: MetricsAlertsResponse;
    user_metrics: MetricsUserResponse;
    advanced_metrics: MetricsAdvancedResponse;
    total_net_revenue: number;
    plans: MetricsPlansResponse;
    monthly_plan_activity: MetricsMontlyPlansResponse[];
}
