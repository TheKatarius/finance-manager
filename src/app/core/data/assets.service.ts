import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  Asset,
  AssetTypeResponse,
  VerifiedTickerResponse,
} from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = '/api/protected'; // Zakładam, że backend API jest dostępny pod tym adresem

  constructor(private http: HttpClient) {}

  searchInstruments(
    q: string,
    typeId: number,
    limit: number = 100,
  ): Observable<VerifiedTickerResponse> {
    let params = new HttpParams();
    params = params.append('q', q);
    params = params.append('typeID', typeId);
    params = params.append('limit', limit);

    return this.http
      .get<VerifiedTickerResponse>(`${this.baseUrl}/instruments/search`, { params })
      .pipe(catchError(this.handleError));
  }

  // Tworzenie nowego aktywa
  createAsset(asset: Asset): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, asset).pipe(catchError(this.handleError));
  }

  // Pobieranie aktywów na podstawie Portfolio ID
  getAssetsByPortfolioId(portfolioId: string): Observable<Asset[]> {
    return this.http
      .get<Asset[]>(`${this.baseUrl}/portfolios/${portfolioId}/assets`)
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
  getAssetTypes(): Observable<AssetTypeResponse> {
    return this.http
      .get<AssetTypeResponse>(`${this.baseUrl}/asset_types`)
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
