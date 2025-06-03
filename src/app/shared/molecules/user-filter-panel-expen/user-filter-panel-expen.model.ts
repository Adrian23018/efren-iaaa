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

export interface UserFilterPanelExpe {
    formGroupName?: FormGroup;
    showSearch?: boolean;
    searchConfig?: UserFilterPanelSearchConfig;
    showPlan?: boolean;
    planConfig?: UserFilterPanelPlanConfig;
    showStatus?: boolean;
    statusConfig?: UserFilterPanelStatusConfig;
    showPeriod?: boolean;
    periodConfig?: UserFilterPanelPeriodConfig;
    showTags?: boolean;
    tagsConfig?: UserFilterPanelTagsConfig; // 👈 Aquí el cambio correcto
    showTopics?: boolean;
    tagsConfigTopis?: UserFilterPanelTagsTopisConfig; // 👈 temas,
    showEmotions?: boolean;
    tagsConfigEmotions?: UserFilterPanelTagsEmotionsConfig; // 👈 temas,
    showDate?: boolean;
    dateConfig?: UserFilterPanelDateConfig; // 👈 fecha,
    showCompanies?: boolean;
    tagsConfigCompanies?: UserFilterPanelTagsCompaniesConfig; // 👈 empresas

}

export interface UserFilterPanelTagsConfig {
    label: string;
    tags: { label: string; value: string }[];
    formControlName: string;
}


export interface UserFilterPanelTagsTopisConfig {
    label: string;
    topic: { label: string; value: string }[];
    formControlName: string;
}


export interface UserFilterPanelTagsEmotionsConfig {
    label: string;
    emotions: { label: string; value: string }[];
    formControlName: string;
}

export interface UserFilterPanelDateConfig {
  labelInicio: string;
  labelFin: string;
  formControlNameInicio: string;
  formControlNameFin: string;
}

export interface UserFilterPanelTagsCompaniesConfig {
  label: string;
  formControlName: string;
  companies: { name: string; id: string }[];
}