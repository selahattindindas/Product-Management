import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Icon, SweetAlertService } from '../services/common/sweetalert.service';
import { AuthService } from '../services/auth.service';
import { AppMessages } from '../constants/messages';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const sweetAlert = inject(SweetAlertService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status = error.status;
      let errorMessage = AppMessages.GENERIC_ERROR;
      
      const isJsonParseError = (
        error.message?.includes('Unexpected token') ||
        error.message?.includes('JSON') ||
        error.message?.includes('SyntaxError') ||
        error.message?.includes('parse') ||
        (typeof error.error === 'string' && error.error.includes('<')) ||
        (error.error?.message?.includes('Unexpected token'))
      );

      if (isJsonParseError) {
        errorMessage = AppMessages.GENERIC_ERROR;
      } else if (!error.status) {
        errorMessage = AppMessages.NETWORK_ERROR;
      } else {
        switch (true) {
          case status === 0:
            errorMessage = AppMessages.CONNECTION_ERROR;
            break;
            
          case status === 401:
            authService.logout();
            sweetAlert.showMessage(AppMessages.SESSION_EXPIRED, Icon.INFO);
            router.navigate(['/login']);
            return throwError(() => error);
            
          case status === 500:
            errorMessage = AppMessages.SERVER_ERROR;
            break;
            
          case status >= 400 && status < 500:
            if (error.error?.message && typeof error.error.message === 'string') {
              errorMessage = error.error.message;
            } else if (error.message && !error.message.includes('Unexpected token')) {
              errorMessage = error.message;
            } else {
              errorMessage = AppMessages.GENERIC_ERROR;
            }
            break;
            
          case status >= 500:
            errorMessage = AppMessages.SERVER_ERROR;
            break;
            
          default:
            errorMessage = AppMessages.GENERIC_ERROR;
            break;
        }
      }

      sweetAlert.showMessage(errorMessage, Icon.ERROR);
      return throwError(() => error);
    })
  );
};