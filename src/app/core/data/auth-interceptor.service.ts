import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthService } from '@app/core/data/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private authService = inject(AuthService);

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    let authReq = request;

    if (accessToken) {
      authReq = this.addTokenHeader(request, accessToken);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log(error);
        if (error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((success: boolean) => {
          this.isRefreshing = false;
          if (success) {
            const newAccessToken = this.authService.getAccessToken();
            if (newAccessToken) {
              this.refreshTokenSubject.next(newAccessToken);
              return next.handle(this.addTokenHeader(request, newAccessToken));
            }
          }
          // Odświeżenie tokenu się nie powiodło - wyloguj użytkownika
          return throwError(() => new Error('Odświeżenie tokenu nie powiodło się'));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          if (token) {
            return next.handle(this.addTokenHeader(request, token));
          }
          return throwError(() => new Error('Brak tokenu po odświeżeniu'));
        }),
      );
    }
  }
}
