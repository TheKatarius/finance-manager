import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from '@app/menu/menu.component';
import { ExpensesComponent } from '@app/personal-finance/expenses/expenses.component';
import { PersonalFinanceComponent } from '@app/personal-finance/personal-finance.component';

const PRIMARY_ROUTES: Routes = [
  {
    path: '',
    component: PersonalFinanceComponent,
    outlet: 'primary',
    children: [
      {
        path: '',
        component: MenuComponent,
        outlet: 'home',
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
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
