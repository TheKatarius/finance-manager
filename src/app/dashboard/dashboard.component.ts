import { Component, inject, OnInit } from '@angular/core';
import { LineChartDataset, Transaction } from '@app/core/interfaces/transaction.schema';
import { TransactionsMocks } from '@app/core/mocks/transactions.mocks';
import { ChartsColorType } from '@common/components/fin-man-charts/fin-man-charts-color-types.schema';
import { YearlyPersonalTransactionsData } from '@app/core/interfaces/chart.schema';
import { PersonalTransactionsService } from '@app/core/data/personal-transactions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finance-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/components/dashboard/dashboard.scss'],
  providers: [PersonalTransactionsService],
})
export class DashboardComponent implements OnInit {
  private personalTransactionsService = inject(PersonalTransactionsService);

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
    {
      label: 'Savings',
      data: [],
      borderColor: ChartsColorType.BLUE,
    },
  ];

  transactionsData: Transaction[] = TransactionsMocks;
  chartData: YearlyPersonalTransactionsData[] = [];

  ngOnInit(): void {
    // Pobierz dostępne lata
    this.chartDataSubscription = this.personalTransactionsService.getChartLineData().subscribe({
      next: (chartData) => {
        this.chartData = chartData;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania lat:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.chartDataSubscription?.unsubscribe();
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  handleTransactionAdded(transactionData: any): void {
    // TODO: Integrate with API
  }
}
