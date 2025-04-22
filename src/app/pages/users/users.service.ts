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

  // getUsers(page: number, limit: number, filter:any) {
  //   const isLoading = signal(true);
  
  //   const response$ = this.http.get<any>(`${this.apiUsersUrl}?page=${page}&limit=${limit}&filter=${filter}`).pipe(
  //     tap(() => isLoading.set(true)),
  //     finalize(() => isLoading.set(false)),
  //     share()
  //   );
  
  //   const data$ = response$.pipe(map(res => res.data || []));
  //   const totalUsers$ = response$.pipe(map(res => res.meta?.totalUsers || 0));
  
  //   return {
  //     data$: data$,
  //     totalUsers$: totalUsers$,
  //     isLoading: isLoading
  //   };
  // }

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
  

  // getUsers(page: number, limit: number, filters: any): {
  //   data$: Observable<Users[]>;
  //   totalUsers$: Observable<number>;
  //   isLoading: Signal<boolean>;
  // } {
  //   let params = new HttpParams()
  //     .set('page', page)
  //     .set('limit', limit);
  
  //   // Agrega dinámicamente los filtros (solo si existen)
  //   Object.keys(filters).forEach(key => {
  //     if (filters[key]) {
  //       params = params.set(key, filters[key]);
  //     }
  //   });
  
  //   const data$ = this.http.get<Users[]>('/api/users', { params });
  //   const totalUsers$ = this.http.get<number>('/api/users/count', { params });
  //   const isLoading = signal(true);
  
  //   return { data$, totalUsers$, isLoading };
  // }
  
  
}
