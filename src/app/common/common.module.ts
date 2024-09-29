import { DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

import { CommonRoutingModule } from '@app/common/common-routing.module';
import { CommonComponent } from '@app/common/common.component';
import { FinManInputComponent } from '@app/common/components/fin-man-input/fin-man-input.component';
import { FinManBasicInfoPanelComponent } from '@common/components/fin-man-basic-info-panel/fin-man-basic-info-panel.component';
import { FinManChartsComponent } from '@common/components/fin-man-charts/fin-man-charts.component';
import { FinManDateDropdownComponent } from '@common/components/fin-man-date-dropdown/fin-man-date-dropdown.component';
import { FinManSearchComponent } from '@common/components/fin-man-search/fin-man-search.component';
import { FinManTransactionPanelComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-panel.component';
import { FinManTransactionRecordComponent } from '@common/components/fin-man-transaction-panel/fin-man-transaction-record/fin-man-transaction-record.component';
import { FinManPieChartComponent } from '@common/components/fin-man-pie-chart/fin-man-pie-chart.component';

const COMMON_COMPONENTS = [
  FinManBasicInfoPanelComponent,
  FinManInputComponent,
  FinManTransactionRecordComponent,
  FinManTransactionPanelComponent,
  FinManSearchComponent,
  FinManChartsComponent,
  FinManDateDropdownComponent,
  FinManPieChartComponent,
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
  ],
  exports: [...COMMON_COMPONENTS],
})
export class CommonModule {}
