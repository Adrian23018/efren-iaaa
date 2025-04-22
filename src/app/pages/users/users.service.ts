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

  // https://api.efrenmartinezortiz-ia.com/webhook/files/getId

  getUserIdFiles(user_id: number) {
    const isLoading = signal(true);
    const data$ = this.http.get<any>(`${this.apiUsersUrl}/file?userId=${user_id}`).pipe(
      map((response) => response.data || []),
      tap((data) => {
        if (data.length > 0) {
          // Guardar la información del primer elemento en el localStorage
          this.setUsersId(data[0].id);
        }
      }),
      finalize(() => isLoading.set(false)),
      share(),
    );

    return { data$: data$, isLoading: isLoading };
  }

}
