import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from '@app/menu/menu.component';
import { BudgetingComponent } from '@app/personal-finance/budgeting/budgeting.component';
import { ExpensesComponent } from '@app/personal-finance/expenses/expenses.component';
import { IncomingsComponent } from '@app/personal-finance/incomings/incomings.component';
import { PersonalFinanceComponent } from '@app/personal-finance/personal-finance.component';
import { SavingsComponent } from '@app/personal-finance/savings/savings.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: PersonalFinanceComponent,
    outlet: 'primary',
    children: [
      {
        path: 'budgeting',
        component: BudgetingComponent,
        children: [
          {
            path: '',
            component: MenuComponent,
            outlet: 'menu',
          },
        ],
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        children: [
          {
            path: '',
            component: MenuComponent,
            outlet: 'menu',
          },
        ],
      },
      {
        path: 'incomings',
        component: IncomingsComponent,
        children: [
          {
            path: '',
            component: MenuComponent,
            outlet: 'menu',
          },
        ],
      },
      {
        path: 'savings',
        component: SavingsComponent,
        children: [
          {
            path: '',
            component: MenuComponent,
            outlet: 'menu',
          },
        ],
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
export class PersonalFinanceRoutingModule {}
