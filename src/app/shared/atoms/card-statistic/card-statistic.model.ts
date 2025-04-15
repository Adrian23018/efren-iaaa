export interface CardStatistic {
    id?: string;
    title: string;
    value?: number | string;
    percentage?: number;
    iconBgClass: string;
    iconClass: string;
    isIcon?: boolean;
    prefixValue?: string;
    bgClass?: string;
    loading?: boolean;
}
