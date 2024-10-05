import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BudgetingComponent } from '@app/personal-finance/budgeting/budgeting.component';
import { PlanBudgetCategoryModalComponent } from '@app/personal-finance/budgeting/plan-budget-category-modal/plan-budget-category-modal.component';
import { ExpensesComponent } from '@app/personal-finance/expenses/expenses.component';
import { PersonalFinanceRoutingModule } from '@app/personal-finance/personal-finance-routing.module';
import { PersonalFinanceComponent } from '@app/personal-finance/personal-finance.component';
import { CommonModule } from '@common/common.module';

const EXPORTED_COMPONENTS = [
  PersonalFinanceComponent,
  ExpensesComponent,
  BudgetingComponent,
  PlanBudgetCategoryModalComponent,
];

@NgModule({
  declarations: [...EXPORTED_COMPONENTS],
  imports: [
    PersonalFinanceRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
  ],
  exports: [...EXPORTED_COMPONENTS],
})
export class PersonalFinanceModule {}
