import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CategoriesResponse,
  PaymentMethodsResponse,
} from '../interfaces/personal-transactions.schema';

@Injectable({
  providedIn: 'root',
})
export class PersonalEnumsService {
  private API_URL = '/api/protected/finance';

  constructor(private http: HttpClient) {}

  getPredefinedCategories(type?: 'income' | 'expense'): Observable<CategoriesResponse> {
    let params = new HttpParams();
    if (type) {
      params = params.append('type', type);
    }

    return this.http
      .get<CategoriesResponse>(`${this.API_URL}/categories/predefined`, { params })
      .pipe(catchError(this.handleError));
  }

  getPredefinedPaymentMethods(): Observable<PaymentMethodsResponse> {
    return this.http
      .get<PaymentMethodsResponse>(`${this.API_URL}/payment/methods`)
      .pipe(catchError(this.handleError));
  }

  // Pomocnicza metoda do obsługi błędów
  private handleError(error: HttpErrorResponse) {
    console.error('Backend returned code:', error.status);
    console.error('Response body:', error.error);
    return throwError(() => error);
  }
}
