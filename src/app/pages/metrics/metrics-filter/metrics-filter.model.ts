import { FormGroup } from '@angular/forms';

export interface MetricsFilter {
  period: string;
  formGroup?: FormGroup;
  formControlName: string;
}