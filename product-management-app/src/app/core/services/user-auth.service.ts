import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClientService } from './common/httpclient.service';
import { AuthService, LoginResponse } from './auth.service';
import { Login } from '../models/auth/login';
import { Register } from '../models/auth/register';
import { AuthResponse } from '../models/auth/token';


@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    private httpClientService = inject(HttpClientService);
    private authService = inject(AuthService);

    register(body: Register): Observable<Register> {
        return this.httpClientService.post<Register>({
            controller: 'Auth',
            action: 'register',
            withCredentials: true
        }, body);
    }

    login(body: Login): Observable<AuthResponse> {
        return this.httpClientService.post<AuthResponse | any>(
            { controller: "Auth", action: "login", withCredentials: true },
            body
        ).pipe(
            tap(res => this.authService.login(res))
        );
    }
}