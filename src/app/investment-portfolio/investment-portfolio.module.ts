import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InvestmentPortfolioRoutingModule } from '@app/investment-portfolio/investment-portfolio-routing.module';
import { InvestmentPortfolioComponent } from '@app/investment-portfolio/investment-portfolio.component';
import { CommonModule } from '@common/common.module';
import { InvestmentPortfolioModalComponent } from '@app/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [InvestmentPortfolioComponent, InvestmentPortfolioModalComponent],
  imports: [
    RouterOutlet,
    InvestmentPortfolioRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [],
  exports: [],
})
export class InvestmentPortfolioModule {}
