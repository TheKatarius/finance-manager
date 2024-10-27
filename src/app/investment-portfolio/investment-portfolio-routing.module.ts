import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvestmentPortfolioComponent } from '@app/investment-portfolio/investment-portfolio.component';
import { MenuComponent } from '@app/menu/menu.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: InvestmentPortfolioComponent,
    outlet: 'primary',
    children: [
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRIMARY_ROUTES)],
  exports: [RouterModule],
})
export class InvestmentPortfolioRoutingModule {}
