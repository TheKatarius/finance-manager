import { DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

import { CommonRoutingModule } from '@app/common/common-routing.module';
import { CommonComponent } from '@app/common/common.component';
import { FinManInputComponent } from '@app/common/components/fin-man-input/fin-man-input.component';
import { PipeModules } from '@app/core/pipes/pipe.modules';
import { FinManBasicBalancePanelComponent } from '@common/components/fin-man-basic-balance-panel/fin-man-basic-balance-panel.component';
import { FinManBasicInfoPanelComponent } from '@common/components/fin-man-basic-info-panel/fin-man-basic-info-panel.component';
import { FinManBudgetOverviewPanelComponent } from '@common/components/fin-man-budget-overview-panel/fin-man-budget-overview-panel.component';
import { FinManChartsComponent } from '@common/components/fin-man-charts/fin-man-charts.component';
import { FinManCustomDropdownComponent } from '@common/components/fin-man-custom-dropdown/fin-man-custom-dropdown.component';
import { FinManNotificationComponent } from '@common/components/fin-man-notification/fin-man-notification.component';
import { FinManPieChartComponent } from '@common/components/fin-man-pie-chart/fin-man-pie-chart.component';
import { FinManProgressBarComponent } from '@common/components/fin-man-progress-bar/fin-man-progress-bar.component';
import { FinManSearchComponent } from '@common/components/fin-man-search/fin-man-search.component';
import { FinManTransactionPanelComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-panel.component';
import { FinManTransactionRecordComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-record/fin-man-transaction-record.component';
import { FinManKebabMenuPopoverComponent } from '@common/components/fin-man-kebab-menu-popover/fin-man-kebab-menu-popover.component';
import { FinManExtendedBalancePanelComponent } from '@common/components/fin-man-extended-balance-panel/fin-man-extended-balance-panel.component';
import { FinManSmallChartComponent } from '@common/components/fin-man-small-chart/fin-man-small-chart.component';
import { FinManPeriodTransactionRecordComponent } from '@common/components/fin-man-transaction-panel/fin-man-period-transaction-record.component.ts/fin-man-period-transaction-record.component';

const COMMON_COMPONENTS = [
  FinManBasicInfoPanelComponent,
  FinManInputComponent,
  FinManTransactionRecordComponent,
  FinManTransactionPanelComponent,
  FinManSearchComponent,
  FinManChartsComponent,
  FinManPieChartComponent,
  FinManBasicBalancePanelComponent,
  FinManProgressBarComponent,
  FinManBudgetOverviewPanelComponent,
  FinManNotificationComponent,
  FinManCustomDropdownComponent,
  FinManKebabMenuPopoverComponent,
  FinManExtendedBalancePanelComponent,
  FinManSmallChartComponent,
  FinManPeriodTransactionRecordComponent,
];

@NgModule({
  declarations: [...COMMON_COMPONENTS, CommonComponent],
  imports: [
    RouterModule,
    CommonRoutingModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    BaseChartDirective,
    FormsModule,
    DatePipe,
    NgStyle,
    PipeModules,
  ],
  exports: [...COMMON_COMPONENTS],
})
export class CommonModule {}
