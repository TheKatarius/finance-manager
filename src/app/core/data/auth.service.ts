import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@app/core/constants/config.const';
import { ApiResponse } from '@app/core/interfaces/api-response.schema';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = API_URL;

  register(email: string, login: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, { email, login, password });
  }

  verifyEmail(email: string, code: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/email/verify`, { email, code });
  }

  login(email_or_login: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/login`, { email_or_login, password });
  }
}
