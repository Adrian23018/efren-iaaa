import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  // getUsers( page:number, limit:number) {
  //   const isLoading = signal(true);
  //   const data$ = this.http.get<any>(`${this.apiUsersUrl}?page=${page}&limit=${limit}`).pipe(
  //     map((response) => response.data || []),
  //     tap((data) => {
  //       if (data.length > 0) {
  //         // Guardar la información del primer elemento en el localStorage
  //         this.setUsersId(data[0].id);
  //       }
  //     }),
  //     finalize(() => isLoading.set(false)),
  //     share(),
  //   );

  //   return { data$: data$, isLoading: isLoading };
  // }

  setUsersId(id: string) {
    localStorage.setItem(this.usersId, id);
  }

  getUsers(page: number, limit: number) {
    const isLoading = signal(true);
  
    const response$ = this.http.get<any>(`${this.apiUsersUrl}?page=${page}&limit=${limit}`).pipe(
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
