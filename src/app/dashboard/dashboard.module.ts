import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { CommonModule } from '@common/common.module';
import { AddTransactionModalComponent } from '@app/dashboard/add-transaction-modal/add-transaction-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalFinanceModule } from '@app/personal-finance/personal-finance.module';
import { NgForOf, NgIf } from '@angular/common';

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
