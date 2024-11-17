import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { PersonalEnumsService } from '@app/core/data/personal-enums.service';
import { PersonalTransactionsService } from '@app/core/data/personal-transactions.service';
import { LineChartDataset, YearlyPersonalTransactions } from '@app/core/interfaces/chart.schema';
import {
  Category,
  PaymentMethod,
  PersonalTransaction,
} from '@app/core/interfaces/personal-transactions.schema';
import { NotificationService } from '@app/core/services/notifications.service';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';

@Component({
  selector: 'finance-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/components/dashboard/dashboard.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private personalEnumsService = inject(PersonalEnumsService);
  private personalTransactionsService = inject(PersonalTransactionsService);
  private notificationService = inject(NotificationService);

  private chartDataSubscription!: Subscription;

  isModalVisible: boolean = false;

  isLoading = true;

  dataSets: LineChartDataset[] = [
    {
      label: 'Expenses',
      data: [],
      borderColor: ChartsColorType.RED,
    },
    {
      label: 'Income',
      data: [],
      borderColor: ChartsColorType.GREEN,
    },
  ];

  userTransactions: PersonalTransaction[] = [];
  chartData: Record<string, YearlyPersonalTransactions> = {};
  categoryNames: string[] = [];
  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  paymentMethods: PaymentMethod[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.chartDataSubscription?.unsubscribe();
  }

  loadData(): void {
    combineLatest([
      this.personalEnumsService.getPredefinedCategories(),
      this.personalEnumsService.getPredefinedPaymentMethods(),
      this.personalTransactionsService.getUserTransactions(),
      this.personalTransactionsService.getChartLineData(),
    ]).subscribe({
      next: ([categories, methods, userTransactions, lineChartData]) => {
        this.categoryNames = categories.categories.map((category) => category.name);
        this.incomeCategories = categories.categories.filter(
          (category) => category.type === 'income',
        );
        this.expenseCategories = categories.categories.filter(
          (category) => category.type === 'expense',
        );

        this.paymentMethods = methods.methods;

        this.userTransactions = userTransactions.data;

        this.chartData = lineChartData.data;

        this.isLoading = false;
      },
      error: () => {
        this.notificationService.addNotification({
          type: 'error',
          message: 'Failed to load categories, payment methods or user transactions',
        });
        this.isLoading = false;
      },
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
