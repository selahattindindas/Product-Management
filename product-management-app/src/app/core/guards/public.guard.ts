import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  
  if (token) {
    // Token varsa admin sayfasına yönlendir
    router.navigate(['/admin']);
    return false;
  } else {
    // Token yoksa login/register sayfalarına erişim ver
    return true;
  }
};
