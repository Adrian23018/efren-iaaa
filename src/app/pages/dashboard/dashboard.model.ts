export interface DashboardMetrics {
    users: number;
    companies: number;
    interactions: number;
    monthlyIncome: number;
}

export interface DashboardUsers {
    date: string;
    totalUsers: number;
}

export interface DashboardIncomes {
    date: string;
    value: number;
}
