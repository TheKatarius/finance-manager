import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Asset, AssetType, VerifiedTicker } from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = '/api/assets'; // Zakładam, że backend API jest dostępny pod tym adresem

  constructor(private http: HttpClient) {}

  // Tworzenie nowego aktywa
  createAsset(asset: Asset): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, asset).pipe(catchError(this.handleError));
  }

  // Pobieranie aktywów na podstawie Portfolio ID
  getAssetsByPortfolioId(portfolioId: string): Observable<Asset[]> {
    const params = new HttpParams().set('portfolioId', portfolioId);
    return this.http.get<Asset[]>(`${this.baseUrl}`, { params }).pipe(catchError(this.handleError));
  }

  // Pobieranie aktywów przez Portfolio ID (inna metoda, jeśli potrzebne)
  getAllAssetsByPortfolioId(portfolioId: string): Observable<Asset[]> {
    return this.http
      .get<Asset[]>(`${this.baseUrl}/portfolio/${portfolioId}`)
      .pipe(catchError(this.handleError));
  }

  // Pobieranie aktywów przez Asset ID
  getAssetById(assetId: string): Observable<Asset> {
    return this.http.get<Asset>(`${this.baseUrl}/${assetId}`).pipe(catchError(this.handleError));
  }

  // Usuwanie aktywa
  deleteAsset(assetId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${assetId}`).pipe(catchError(this.handleError));
  }

  // Aktualizacja aktywa
  updateAsset(asset: Asset): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/${asset.id}`, asset)
      .pipe(catchError(this.handleError));
  }

  // Pobieranie typów aktywów
  getAssetTypes(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(`${this.baseUrl}/types`).pipe(catchError(this.handleError));
  }

  // Weryfikacja ticker'a
  verifyTicker(ticker: string, exchange: string, currency: string): Observable<VerifiedTicker> {
    const params = new HttpParams()
      .set('ticker', ticker)
      .set('exchange', exchange)
      .set('currency', currency);
    return this.http
      .get<VerifiedTicker>(`${this.baseUrl}/verify-ticker`, { params })
      .pipe(catchError(this.handleError));
  }

  // Aktualizacja zbiorczych cen aktywów
  updateAssetPricing(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/update-pricing`, {})
      .pipe(catchError(this.handleError));
  }

  // Pomocnicza metoda do obsługi błędów
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Błąd po stronie klienta
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Błąd po stronie serwera
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Możesz dodać dodatkową logikę logowania błędów tutaj
    return throwError(errorMsg);
  }
}
