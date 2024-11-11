import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AssetTransaction,
  AssetTransactionCreateRequest,
  AssetTransactionResponse,
  AssetTransactionType,
} from '../interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class AssetTransactionsService {
  private API_URL = '/api/protected'; // URL do backendowego endpointu transakcji

  constructor(private http: HttpClient) {}

  getTransactionTypes(): Observable<HttpResponse<AssetTransactionType[]>> {
    return this.http
      .get<AssetTransactionType[]>(`${this.API_URL}/transaction-types`, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Pobieranie listy transakcji
  getTransactions(
    portfolioID: string,
    assetID: string,
  ): Observable<HttpResponse<AssetTransactionResponse>> {
    return this.http
      .get<AssetTransactionResponse>(
        `${this.API_URL}/portfolios/${portfolioID}/assets/${assetID}/transactions`,
        { observe: 'response' },
      )
      .pipe(catchError(this.handleError));
  }

  // Tworzenie nowej transakcji
  createTransaction(
    portfolioID: string,
    assetID: string,
    transaction: AssetTransactionCreateRequest,
  ): Observable<HttpResponse<AssetTransaction>> {
    return this.http
      .post<AssetTransaction>(
        `${this.API_URL}/portfolios/${portfolioID}/assets/${assetID}/transactions`,
        transaction,
        { observe: 'response' },
      )
      .pipe(catchError(this.handleError));
  }

  //   // Aktualizacja istniejącej transakcji
  //   updateTransaction(transaction: AssetTransaction): Observable<AssetTransaction> {
  //     transaction.updatedAt = new Date();
  //     return this.http
  //       .put<AssetTransaction>(`${this.apiUrl}/${transaction.id}`, transaction)
  //       .pipe(catchError(this.handleError));
  //   }

  //   // Usuwanie transakcji
  //   deleteTransaction(transactionId: string): Observable<void> {
  //     return this.http
  //       .delete<void>(`${this.apiUrl}/${transactionId}`)
  //       .pipe(catchError(this.handleError));
  //   }

  // Pomocnicza metoda do obsługi błędów
  private handleError(error: HttpErrorResponse) {
    console.error('Backend returned code:', error.status);
    console.error('Response body:', error.error);
    return throwError(() => error);
  }
}
