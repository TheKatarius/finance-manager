import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Portfolio, PortfolioResponse } from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = '/api/protected/portfolios'; // URL do backendowego endpointu portfeli

  constructor(private http: HttpClient) {}

  getPortfolios(): Observable<PortfolioResponse> {
    return this.http.get<PortfolioResponse>(this.apiUrl);
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    portfolio.createdAt = new Date();
    portfolio.updatedAt = new Date();
    return this.http.post<Portfolio>(this.apiUrl, portfolio);
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    portfolio.updatedAt = new Date();
    return this.http.put<Portfolio>(`${this.apiUrl}/${portfolio.id}`, portfolio);
  }

  deletePortfolio(portfolioId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${portfolioId}`);
  }
}
