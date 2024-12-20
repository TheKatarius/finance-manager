import { DatePipe, NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
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
import { FinManCircleProgressBarComponent } from '@common/components/fin-man-circle-progress-bar/fin-man-circle-progress-bar.component';
import { FinManCustomDropdownComponent } from '@common/components/fin-man-custom-dropdown/fin-man-custom-dropdown.component';
import { FinManDynamicInvestmentPanelComponent } from '@common/components/fin-man-dynamic-investment-panel/fin-man-dynamic-investment-panel.component';
import { FinManExtendedBalancePanelComponent } from '@common/components/fin-man-extended-balance-panel/fin-man-extended-balance-panel.component';
import { FinManImportTransactionsComponent } from '@common/components/fin-man-import-transactions/fin-man-import-transactions.component';
import { FinManKebabMenuPopoverComponent } from '@common/components/fin-man-kebab-menu-popover/fin-man-kebab-menu-popover.component';
import { FinManNotificationComponent } from '@common/components/fin-man-notification/fin-man-notification.component';
import { FinManPieChartComponent } from '@common/components/fin-man-pie-chart/fin-man-pie-chart.component';
import { FinManPortfolioPanelComponent } from '@common/components/fin-man-portfolio-panel/fin-man-portfolio-panel.component';
import { FinManProgressBarComponent } from '@common/components/fin-man-progress-bar/fin-man-progress-bar.component';
import { FinManSavingGoalPanelComponent } from '@common/components/fin-man-saving-goal-panel/fin-man-saving-goal-panel.component';
import { FinManSearchComponent } from '@common/components/fin-man-search/fin-man-search.component';
import { FinManTransactionPanelComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-panel.component';
import { FinManTransactionRecordComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-record/fin-man-transaction-record.component';

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
  FinManSavingGoalPanelComponent,
  FinManCircleProgressBarComponent,
  FinManImportTransactionsComponent,
  FinManDynamicInvestmentPanelComponent,
  FinManPortfolioPanelComponent,
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
    NgTemplateOutlet,
  ],
  exports: [...COMMON_COMPONENTS],
})
export class CommonModule {}
