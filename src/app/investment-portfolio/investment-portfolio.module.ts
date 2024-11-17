import { NgClass, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { InvestmentPortfolioModalPortfolioComponent } from '@app/investment-portfolio/investment-portfolio-modal-portfolio/investment-portfolio-modal-portfolio.component';
import { InvestmentPortfolioModalComponent } from '@app/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.component';
import { InvestmentPortfolioRoutingModule } from '@app/investment-portfolio/investment-portfolio-routing.module';
import { InvestmentPortfolioComponent } from '@app/investment-portfolio/investment-portfolio.component';
import { CommonModule } from '@common/common.module';
import { InvestmentPortfolioModalTransactions } from './investment-portfolio-modal-transaction/investment-portfolio-modal-transaction.component';

@NgModule({
  declarations: [
    InvestmentPortfolioComponent,
    InvestmentPortfolioModalPortfolioComponent,
    InvestmentPortfolioModalComponent,
    InvestmentPortfolioModalTransactions,
  ],
  imports: [
    RouterOutlet,
    InvestmentPortfolioRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
  providers: [],
  exports: [],
})
export class InvestmentPortfolioModule {}
