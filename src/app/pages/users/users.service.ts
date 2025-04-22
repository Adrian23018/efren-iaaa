import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { finalize, map, Observable, share, tap } from 'rxjs';
import { environment } from '@environment';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUsersUrl = `${environment.baseApiUrl}/${environment.endpoints.users}`;
  private http = inject(HttpClient);
  private usersId = 'usersId';

  setUsersId(id: string) {
    localStorage.setItem(this.usersId, id);
  }

  getUsers(page: number, limit: number, filters: any) {
    const isLoading = signal(true);
    // Cuerpo que enviarás por POST
    const body = {
      page,
      limit,
      filters
    };
  
    const response$ = this.http.post<any>(`${this.apiUsersUrl}`, body).pipe(
      tap(() => isLoading.set(true)),
      finalize(() => isLoading.set(false)),
      share()
    );
  
    const data$ = response$.pipe(map(res => res.data || []));
    const totalUsers$ = response$.pipe(map(res => res.meta?.totalUsers || 0));
  
    return {
      data$: data$,
      totalUsers$: totalUsers$,
      isLoading: isLoading
    };
  }

}
