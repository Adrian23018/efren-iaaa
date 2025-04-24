import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = sessionStorage.getItem("access_token"); 

    if (session) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${session}`
        }
      });
      return next.handle(authReq);
    }

    // Si no hay token, continuar sin modificar la solicitud
    return next.handle(req);
  }
}
