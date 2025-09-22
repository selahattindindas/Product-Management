import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig, withViewTransitions } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';

import { routes } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withViewTransitions(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',

      })
    ),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, authInterceptor]),
      withFetch(),
      withInterceptorsFromDi(),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => inject(AuthService).getToken(),
          allowedDomains: ["localhost:5298"],
        }
      })
    )
  ]
};

