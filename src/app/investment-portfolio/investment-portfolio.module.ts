import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InvestmentPortfolioRoutingModule } from '@app/investment-portfolio/investment-portfolio-routing.module';
import { InvestmentPortfolioComponent } from '@app/investment-portfolio/investment-portfolio.component';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [InvestmentPortfolioComponent],
  imports: [RouterOutlet, InvestmentPortfolioRoutingModule, CommonModule],
  providers: [],
  exports: [],
})
export class InvestmentPortfolioModule {}
