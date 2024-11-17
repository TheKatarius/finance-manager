import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DatePersonalTransactionsSummaryResponse } from '../interfaces/chart.schema';
import {
  PersonalTransaction,
  PersonalTransactionRequest,
  PersonalTransactionsResponse,
} from '../interfaces/personal-transactions.schema';

@Injectable({
  providedIn: 'root',
})
export class PersonalTransactionsService {
  private baseUrl = '/api/protected/finance'; // Zakładam, że backend API jest dostępny pod tym adresem

  constructor(private http: HttpClient) {}

  getUserTransactions(
    page?: number,
    limit: number = 10000,
  ): Observable<PersonalTransactionsResponse> {
    let params = new HttpParams();
    params = params.append('limit', limit);
    if (page) {
      params.append('page', page);
    }

    return this.http
      .get<PersonalTransactionsResponse>(`${this.baseUrl}/transactions`, { params })
      .pipe(catchError(this.handleError));
  }

  createUserTransaction(
    transaction: PersonalTransaction,
  ): Observable<HttpResponse<PersonalTransaction>> {
    return this.http
      .post<PersonalTransaction>(`${this.baseUrl}/transactions`, transaction, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  createMultipleUserTransactions(
    transactions: PersonalTransactionRequest[],
  ): Observable<HttpResponse<void>> {
    return this.http
      .post<void>(
        `${this.baseUrl}/transactions/bulk`,
        { transactions },
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.handleError));
  }

  getChartLineData(): Observable<DatePersonalTransactionsSummaryResponse> {
    return this.http
      .get<DatePersonalTransactionsSummaryResponse>(`${this.baseUrl}/transactions/summary`)
      .pipe(catchError(this.handleError));
  }

  // Pomocnicza metoda do obsługi błędów
  private handleError(error: HttpErrorResponse) {
    console.error('Backend returned code:', error.status);
    console.error('Response body:', error.error);
    return throwError(() => error);
  }
}
