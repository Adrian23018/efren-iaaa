import { FormGroup } from "@angular/forms";

export interface UserFilterPanelSearchConfig {
    label: string;
    placeholder: string;
    formControlName: string; 
}

export interface UserFilterPanelPlan {
    label: string;
    value: number;
}

export interface UserFilterPanelPlanConfig {
    label: string;
    plans: UserFilterPanelPlan[];
    formControlName: string; 
}

export interface UserFilterPanelStatus {
    label: string;
    value: string;
}

export interface UserFilterPanelStatusConfig {
    label: string;
    states: UserFilterPanelStatus[];
    formControlName: string; 
}

export interface UserFilterPanelPeriod {
    label: string;
    value: string;
}

export interface UserFilterPanelPeriodConfig {
    label: string;
    periods: UserFilterPanelPeriod[];
    formControlName: string; 
}

export interface UserFilterPanel {
    formGroupName?: FormGroup;
    showSearch?: boolean;
    searchConfig?: UserFilterPanelSearchConfig;
    showPlan?: boolean;
    planConfig?: UserFilterPanelPlanConfig;
    showStatus?: boolean;
    statusConfig?: UserFilterPanelStatusConfig;
    showPeriod?: boolean;
    periodConfig?: UserFilterPanelPeriodConfig;
}