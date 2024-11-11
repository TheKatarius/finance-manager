import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Portfolio, PortfolioResponse } from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = '/api/protected/portfolios'; // URL do backendowego endpointu portfeli

  constructor(private http: HttpClient) {}

  // Pobieranie listy portfeli
  getPortfolios(): Observable<PortfolioResponse> {
    return this.http.get<PortfolioResponse>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Tworzenie nowego portfela
  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    portfolio.createdAt = new Date();
    portfolio.updatedAt = new Date();
    return this.http.post<Portfolio>(this.apiUrl, portfolio).pipe(catchError(this.handleError));
  }

  // Aktualizacja istniejącego portfela
  updatePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    portfolio.updatedAt = new Date();
    return this.http
      .put<Portfolio>(`${this.apiUrl}/${portfolio.id}`, portfolio)
      .pipe(catchError(this.handleError));
  }

  // Usuwanie portfela
  deletePortfolio(portfolioId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${portfolioId}`)
      .pipe(catchError(this.handleError));
  }
  // Pomocnicza metoda do obsługi błędów
  private handleError(error: HttpErrorResponse) {
    console.error('Backend returned code:', error.status);
    console.error('Response body:', error.error);
    return throwError(() => error);
  }
}
