import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { API_URL } from '@app/core/constants/config.const';
import {
  DecodedToken,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@app/core/interfaces/api-responses.schema';
import { NotificationService } from '../services/notifications.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private cookieService = inject(CookieService); // Dodaj ten wstrzyknięcie

  // Klucze używane do przechowywania tokenów w localStorage
  private readonly ACCESS_TOKEN_KEY = 'access_token';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  register(request: RegisterRequest): Observable<HttpResponse<RegisterResponse>> {
    return this.http
      .post<RegisterResponse>(`${API_URL}/register`, request, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<RegisterResponse>) => {
          if (response.status === 201) {
            this.loggedIn.next(false);
          }
        }),
        catchError((error: any) => {
          const errorMessage = error.error?.message || 'Error registering user';
          console.error(errorMessage, error);
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  verifyEmail(request: VerifyEmailRequest): Observable<HttpResponse<VerifyEmailResponse>> {
    return this.http
      .post<VerifyEmailResponse>(`${API_URL}/email/verify`, request, { observe: 'response' })
      .pipe(
        catchError((error: any) => {
          const errorMessage = error.error?.message || 'Error verifying email';
          console.error(errorMessage, error);
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  login(request: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, request, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((response: HttpResponse<LoginResponse>) => {
          const tokens = response.body?.data;
          if (tokens) {
            this.setAccessToken(tokens.access_token);
            this.loggedIn.next(true);
          }
        }),
        catchError((error: any) => {
          const errorMessage = error.error?.message || 'Error logging in';
          console.error(errorMessage, error);
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  // Wylogowanie użytkownika
  logout(): void {
    this.http.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }).subscribe(
      () => {
        this.removeAccessToken();
        this.loggedIn.next(false);

        this.router.navigate(['/login']).then(() =>
          this.notificationService.addNotification({
            type: 'success',
            message: 'User logged out successfully',
          }),
        );
      },
      (error) => {
        console.error('Error during logout:', error);
        this.removeAccessToken();
        this.loggedIn.next(false);
      },
    );
  }

  refreshToken(): Observable<boolean> {
    return this.http
      .put(`${API_URL}/refresh/token`, {}, { observe: 'response', withCredentials: true })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const tokens = response.body?.data;
          if (tokens) {
            this.setAccessToken(tokens.access_token);
            this.loggedIn.next(true);
          } else {
            this.logout();
          }
        }),
        switchMap(() => of(true)),
        catchError((error) => {
          this.logout();
          return of(false);
        }),
      );
  }

  getDecodedAccessToken(): DecodedToken | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedAccessToken();
    if (!decoded) return true;
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return decoded.exp < currentTime;
  }

  // Sprawdzenie czy użytkownik jest zalogowany
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserIdFromToken(): string | null {
    const decoded = this.getDecodedAccessToken();
    return decoded ? decoded.sub : null;
  }

  private hasToken(): boolean {
    return !!this.getAccessToken();
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}
