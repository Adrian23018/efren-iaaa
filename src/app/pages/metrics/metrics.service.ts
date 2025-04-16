import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import { ChartMetrics, GeneralMetrics, PurchaseData } from '@app/interfaces/metrics.model';

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
    return this.http.get<ChartMetrics[]>(`${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.users}`);
  }

  getIncomes(): Observable<ChartMetrics[]> {
    return this.http.get<ChartMetrics[]>(`${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.incomes}`);
  }

  getPurcharses(): Observable<PurchaseData[]> {
    return this.http.get<PurchaseData[]>(`${this.apiDasboardUrl}/${environment.endpoints.metrics}/${environment.endpoints.purcharses}`);
  }
}
