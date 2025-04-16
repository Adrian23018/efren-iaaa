import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import {
  AlertsMetrics,
  ChartMetrics,
  EarlyAlerts,
  GeneralMetrics,
  PurchaseData,
} from '@app/interfaces/metrics.model';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}`;

  constructor(private readonly http: HttpClient) {}

  getGeneralMetrics(): Observable<GeneralMetrics> {
    return this.http.get<GeneralMetrics>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.general}`
    );
  }

  getGeneralUsers(): Observable<ChartMetrics[]> {
    return this.http.get<ChartMetrics[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.users}`
    );
  }

  getIncomes(): Observable<ChartMetrics[]> {
    return this.http.get<ChartMetrics[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.incomes}`
    );
  }

  getPurcharses(): Observable<PurchaseData[]> {
    return this.http.get<PurchaseData[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.purcharses}`
    );
  }

  getAlertsMetrics(): Observable<AlertsMetrics> {
    return this.http.get<AlertsMetrics>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.alerts}`
    );
  }

  getEarliesAlerts(): Observable<EarlyAlerts[]> {
    return this.http.get<EarlyAlerts[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.earlies}/${environment.endpoints.alerts}`
    );
  }
}
