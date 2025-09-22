import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserPayload } from '../models/auth/user';
import { SweetAlertService } from './common/sweetalert.service';
import { AppMessages } from '../constants/messages';


export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserPayload | null;
  token: string | null;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    role: string;
    createdAt: string;
  };
  expiresAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly jwtHelper = new JwtHelperService();
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);
  private autoLogoutTimer: any = null;

  private readonly authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    currentUser: null,
    token: null
  });

  readonly authState$ = this.authStateSubject.asObservable();
  readonly isAuthenticated$ = this.authState$.pipe(map(s => s.isAuthenticated));
  readonly currentUser$ = this.authState$.pipe(map(s => s.currentUser));
  readonly token$ = this.authState$.pipe(map(s => s.token));

  constructor() {
    this.restoreAuthState();
  }

  // Sayfa yenilendiğinde token'ı kontrol edip kullanıcıyı login bırakır
  private restoreAuthState(): void {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const userData = localStorage.getItem('currentUser');
      const userPayload = userData ? JSON.parse(userData) : null;
 
      const tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
      if (tokenExpiration) {
        this.setAutoLogoutTimer(tokenExpiration);
      }
      
      this.updateState(true, userPayload, token);
    } else {
      this.clearAuthData();
    }
  }

  logout(): void {
    this.clearAutoLogoutTimer();
    this.cookieService.delete('token', '/');
    localStorage.removeItem('currentUser');
    this.clearAuthData();
  }

  // Token'ı cookie'ye atar ve 1 saat sonra otomatik logout ayarlar
  setToken(token: string): void {
    const tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
    const expirationDate = tokenExpiration || new Date(Date.now() + 60 * 60 * 1000); 
    
    this.cookieService.set('token', token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: expirationDate
    });
    
    this.setAutoLogoutTimer(expirationDate);
    
    this.updateState(true, this.decodeUser(token), token);
  }

  // Login olduktan sonra token'ı ve kullanıcı bilgilerini saklar
  login(loginResponse: LoginResponse): void {
    let expirationDate: Date;
    
    if (loginResponse.expiresAt) {
      expirationDate = new Date(loginResponse.expiresAt);
    } else {
      const tokenExpiration = this.jwtHelper.getTokenExpirationDate(loginResponse.token);
      expirationDate = tokenExpiration || new Date(Date.now() + 60 * 60 * 1000);
    }
    
    this.cookieService.set('token', loginResponse.token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: expirationDate
    });
    
    this.setAutoLogoutTimer(expirationDate);
    
    const userPayload: UserPayload = {
      fullName: loginResponse.user.fullName,
      email: loginResponse.user.email,
      role: loginResponse.user.role
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userPayload));
    
    this.updateState(true, userPayload, loginResponse.token);
  }

  getToken(): string | null {
    const token = this.cookieService.get('token');
    return token && !this.jwtHelper.isTokenExpired(token) ? token : null;
  }

  getRefreshToken(): string | null {
    const token = this.cookieService.get('refreshToken');
    return token && !this.jwtHelper.isTokenExpired(token) ? token : null;
  }

  /** Kullanıcı bilgisi decode */
  private decodeUser(token: string): UserPayload | null {
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return { fullName: decoded.fullName, email: decoded.email, role: decoded.role };
    } catch {
      return null;
    }
  }

  /** State yönetimi */
  private updateState(isAuthenticated: boolean, user: UserPayload | null, token: string | null) {
    this.authStateSubject.next({ isAuthenticated, currentUser: user, token });
  }

  private clearAuthData() {
    this.updateState(false, null, null);
  }

  // Süre dolunca otomatik logout yapar
  private setAutoLogoutTimer(expirationDate: Date): void {
    this.clearAutoLogoutTimer();
    
    const timeUntilExpiration = expirationDate.getTime() - new Date().getTime();
    
    if (timeUntilExpiration > 0) {
      this.autoLogoutTimer = setTimeout(() => {
        this.sweetAlertService.showMessage(AppMessages.SESSION_EXPIRED);
        this.logout();
        this.router.navigate(['/login']);
      }, timeUntilExpiration);
    }
  }

  private clearAutoLogoutTimer(): void {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  isAuthenticated(): boolean { return this.authStateSubject.value.isAuthenticated; }
  getCurrentUser(): UserPayload | null { return this.authStateSubject.value.currentUser; }
  getCurrentToken(): string | null { return this.authStateSubject.value.token; }

  ngOnDestroy(): void {
    this.clearAutoLogoutTimer();
    this.authStateSubject.complete();
  }
}
