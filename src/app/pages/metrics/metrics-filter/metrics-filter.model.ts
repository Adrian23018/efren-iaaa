import { FormGroup } from '@angular/forms';
import { PeriodFilter } from '@app/interfaces/metrics.model';

export interface MetricsFilter {
  period: PeriodFilter;
  type: number;
  formGroup?: FormGroup;
  formControlName: string;
}