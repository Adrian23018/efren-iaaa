export interface CardStatistic {
    id?: string;
    title: string;
    value?: number | string;
    percentage?: number;
    sufixPercentage?: string;
    iconBgClass: string;
    iconClass: string;
    isIcon?: boolean;
    prefixValue?: string;
    sufixValue?: string;
    bgClass?: string;
    loading?: boolean;
}
