import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { finalize, map, Observable, share, tap } from 'rxjs';
import { environment } from '@environment';
import { MapperTransformData } from '@app/shared/utils/transformData';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiLoginUrl = `${environment.baseApiUrl}/${environment.endpoints.login}`;
  private http = inject(HttpClient);
  private userId = 'usersId';
  private tokenKey = 'authToken';
  public userInfo = 'userInfo';

  loginUser(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiLoginUrl}`, loginData).pipe(
      map((response) => {
        // Almacenar el token en localStorage
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userId, response.userId);
        localStorage.setItem(this.userInfo, JSON.stringify(response.userInfo));
        return response;
      }),
    );
  }



}
