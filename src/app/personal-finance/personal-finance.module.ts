import { NgModule } from '@angular/core';

import { BudgetingComponent } from '@app/personal-finance/budgeting/budgeting.component';
import { ExpensesComponent } from '@app/personal-finance/expenses/expenses.component';
import { PersonalFinanceRoutingModule } from '@app/personal-finance/personal-finance-routing.module';
import { PersonalFinanceComponent } from '@app/personal-finance/personal-finance.component';
import { CommonModule } from '@common/common.module';

const EXPORTED_COMPONENTS = [PersonalFinanceComponent, ExpensesComponent, BudgetingComponent];

@NgModule({
  declarations: [...EXPORTED_COMPONENTS],
  imports: [PersonalFinanceRoutingModule, CommonModule],
  exports: [...EXPORTED_COMPONENTS],
})
export class PersonalFinanceModule {}
