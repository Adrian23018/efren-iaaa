import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable, share, tap } from 'rxjs';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly apiConmpaniesUrl = `${environment.baseApiUrl}/${environment.endpoints.companies}`;
  private http = inject(HttpClient);
  private companyId = 'companyId';

  setUsersId(id: string) {
    localStorage.setItem(this.companyId, id);
  }

  getCompanies(page: number, limit: number) {
    const isLoading = signal(true);
  
    const response$ = this.http.get<any>(`${this.apiConmpaniesUrl}?page=${page}&limit=${limit}`).pipe(
      tap(() => isLoading.set(true)),
      finalize(() => isLoading.set(false)),
      share()
    );
  
    const data$ = response$.pipe(map(res => res.data || []));
    const totalCompanies$ = response$.pipe(map(res => res.meta?.totalCompanies || 0));
  
    return {
      data$: data$,
      totalCompanies$: totalCompanies$,
      isLoading: isLoading
    };
  }
  
}
