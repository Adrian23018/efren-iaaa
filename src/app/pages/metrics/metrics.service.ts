import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environment';
import { MetricsResponse } from '@app/interfaces/metrics-response.model';
import { Metrics } from '@app/interfaces/metrics-data.model';
import { MapperTransformData } from '@app/shared/utils/transformData';
import { AlertsMetrics, ChartMetrics, EarlyAlerts, GeneralMetrics, MessageUsage, PlanStats, PurcharseSource, PurchaseData, UserMetric } from '@app/interfaces/metrics.model';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}`;

  constructor(private readonly http: HttpClient) { }

  getMetrics(interval: string, type: number): Observable<Metrics> {
    const body = {
      interval, type
    };

    return this.http.post<MetricsResponse>(
      `${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}`,
      body
    ).pipe(
      map(response => MapperTransformData.transformMetricsResponse(response))
    );
  }

  // getMetrics(): Observable<GeneralMetrics> {
  //   return this.http.get<GeneralMetrics>(
  //     `${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.general}`
  //   );
  // }

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

  getMetricsUsers(): Observable<UserMetric[]> {
    return this.http.get<UserMetric[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metricsUsersDetail}`
    );
  }

  getMetricsPlans(): Observable<PlanStats[]> {
    return this.http.get<PlanStats[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metricsUsersPlans}`
    );
  }

  getMessageUsageByPlan(): Observable<MessageUsage[]> {
    return this.http.get<MessageUsage[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metricsAdvancedMessages}`
    );
  }

  getPurchaseSources(): Observable<PurcharseSource[]> {
    return this.http.get<PurcharseSource[]>(
      `${this.apiDasboardUrl}/${environment.endpoints.metricsAdvancedPurcharses}`
    );
  }

  getMetricsAlerts(interval: string, type: number): Observable<Metrics> {
    const body = {
      interval, type
    };
    return this.http.post<Metrics>(`${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}`, body).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  getMetricsUsersData(interval: string, type: number, page: number, limit: number, filter: any, flag: any): Observable<Metrics> {
    const body = {
      interval,
      type,
      page,
      limit,
      filter,
      flag
    };
    return this.http.post<Metrics>(`${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}`, body).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  getMetricsUsersDataGrafica(interval: string, type: number, page: number, limit: number, flag: boolean): Observable<Metrics> {
    const body = {
      interval,
      type,
      page,
      limit,
      flag
    };
    return this.http.post<Metrics>(`${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}-graficas`, body).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  getMetricsAvance(interval: string, type: number): Observable<Metrics> {
    const body = {
      interval, type
    };
    return this.http.post<Metrics>(`${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}`, body).pipe(
      map((response) => {
        return response;
      }),
    );
  }


  // getMetrics(interval: string, type:number): Observable<Metrics> {
  //   const body = {
  //     interval,type
  //   };

  //   return this.http.post<MetricsResponse>(
  //     `${this.apiDasboardUrl}/${environment.endpoints.metricsAdvanced}`,
  //     body
  //   ).pipe(
  //     map(response => MapperTransformData.transformMetricsResponse(response))
  //   );
  // }
}
