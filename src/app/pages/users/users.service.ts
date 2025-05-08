import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { finalize, map, Observable, share, tap } from 'rxjs';
import { environment } from '@environment';
import { MapperTransformData } from '@app/shared/utils/transformData';

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

  getUserIdFiles(user_id: number) {
    const isLoading = signal(true);

    // Realiza la llamada HTTP para obtener los datos
    const data$ = this.http.get<any>(`${this.apiUsersUrl}/file?userId=${user_id}`).pipe(
      map((response) => {
        // Asegúrate de que la respuesta es la correcta
        return MapperTransformData.transformUserFile(response) || [];  // Si la respuesta está vacía, devuelve un arreglo vacío
      }),
      tap((data) => {

      }),
      finalize(() => {
        isLoading.set(false);  // Finaliza el estado de carga
      }),
      share()  // Comparte la respuesta entre varios suscriptores si es necesario
    );

    // Devuelve el observable con el estado de carga
    return { data$: data$, isLoading };
  }

  getUserId(user_id: number) {
    const isLoading = signal(true);
  
    const data$ = this.http.get<any>(`${this.apiUsersUrl}/user?userId=${user_id}`).pipe(
      tap(() => {
        // Aquí podrías hacer algo si necesitas (opcional)
      }),
      finalize(() => {
        isLoading.set(false);
      }),
      share()
    );
  
    return { data$: data$, isLoading };
  }


  postUserIds(userIds: number[]) {
    const isLoading = signal(true);
  
    const data$ = this.http.post<any>(`${this.apiUsersUrl}/download`, { userIds }).pipe(
      tap(() => {
        // Aquí podrías hacer algo si necesitas
      }),
      finalize(() => {
        isLoading.set(false);
      }),
      share()
    );
  
    return { data$: data$, isLoading };
  }
  
  
  

}
