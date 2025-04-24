import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(): boolean {
        const token = sessionStorage.getItem("access_token");

        if (token) {
            // Aquí podrías incluso validar el token si lo deseas
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
