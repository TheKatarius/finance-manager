import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InvestmentPortfolioService {
  constructor(private router: Router) {}

  reloadInvestmentPortfolioPage(): void {
    this.router.navigateByUrl('/investment-portfolio-temp').then(() => {
      this.router.navigate(['/investment-portfolio']);
    });
  }
}
