import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { API_URL } from '@app/core/constants/config.const';

import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const http = inject(HttpClient);

  // Wykluczanie logiki guard dla strony logowania
  if (state.url === '/login') {
    return of(true); // Nie ma potrzeby weryfikacji na stronie logowania
  }

  return authService.isLoggedIn().pipe(
    take(1),
    switchMap((isLoggedIn) => {
      if (!isLoggedIn || authService.isTokenExpired()) {
        return of(router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }));
      }

      return http
        .get<{ status: string }>(`${API_URL}/auth/verify-token`, { observe: 'response' })
        .pipe(
          map((response) => {
            if (response && response.status >= 200 && response.status < 300) {
              return true;
            }

            return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
          }),
          catchError(() =>
            of(router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })),
          ),
        );
    }),
  );
};
