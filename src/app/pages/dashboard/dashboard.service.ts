import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import { DashboardMetrics } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}/${environment.endpoints.statistics}`;
  
  constructor(private readonly http: HttpClient) {}

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiDasboardUrl}/${environment.endpoints.metrics}`);
  }
}
