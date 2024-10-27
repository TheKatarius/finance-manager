import { NgForOf, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { AddTransactionModalComponent } from '@app/dashboard/add-transaction-modal/add-transaction-modal.component';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { PersonalFinanceModule } from '@app/personal-finance/personal-finance.module';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterOutlet,
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    PersonalFinanceModule,
    NgIf,
    NgForOf,
    AddTransactionModalComponent,
  ],
  exports: [],
})
export class DashboardModule {}
