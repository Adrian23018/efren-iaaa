import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import { DashboardIncomes, DashboardMetrics, DashboardUsers } from './dashboard.model';
import { Alert } from '@app/interfaces/alert.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiDasboardUrl = `${environment.baseApiUrl}/${environment.endpoints.statistics}`;
  
  constructor(private readonly http: HttpClient) {}

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiDasboardUrl}/${environment.endpoints.metrics}`);
  }

  getUsers(): Observable<DashboardUsers[]> {
    return this.http.get<DashboardUsers[]>(`${this.apiDasboardUrl}/${environment.endpoints.users}`);
  }

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiDasboardUrl}/${environment.endpoints.alerts}`);
  }

  getIncomes(): Observable<DashboardIncomes[]> {
    return this.http.get<DashboardIncomes[]>(`${this.apiDasboardUrl}/${environment.endpoints.incomes}`);
  }
}
