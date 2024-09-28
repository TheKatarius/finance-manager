import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterOutlet, DashboardRoutingModule, CommonModule],
})
export class DashboardModule {}
