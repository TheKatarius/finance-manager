import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PersonalTransactionsService } from '@app/core/data/personal-transactions.service';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import {
  PersonalTransaction,
  PersonalTransactionRequest,
} from '@app/core/interfaces/personal-transactions.schema';
import { ReloadPageService } from '@app/core/services/dashboard.service';
import { NotificationService } from '@app/core/services/notifications.service';

@Component({
  selector: 'fin-man-transaction-panel',
  templateUrl: './fin-man-transaction-panel.component.html',
  styleUrls: ['./fin-man-transaction-panel.scss'],
})
export class FinManTransactionPanelComponent {
  @Input() extendedPanel: boolean = false;
  @Input() panelTitle: string = 'Transactions';
  @Input() transactionData: PersonalTransaction[] = [];
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;
  @Input() isImportActive: boolean = false;
  @Input() categoryNames: string[] = [];

  @Output() openModal = new EventEmitter<void>();

  readonly CategoryKind = CategoryKind;

  private personalTransactionsService = inject(PersonalTransactionsService);
  private notificationService = inject(NotificationService);
  private reloadPageService = inject(ReloadPageService);

  transactionsPage: PersonalTransaction[] = [];

  pages: number = 1;
  pageList: number[] = [];
  pageSize: number = 50;

  control = new FormControl('');

  ngOnInit(): void {
    this.pages = Math.ceil(this.transactionData.length / this.pageSize);

    for (let i = 1; i <= this.pages; i++) {
      this.pageList.push(i);
    }

    this.transactionsPage = this.transactionData.slice(0, this.pageSize);
  }

  changePage(page: number): void {
    this.transactionsPage = this.transactionData.slice(
      (page - 1) * this.pageSize,
      page * this.pageSize,
    );
  }

  importTransactions(transactions: PersonalTransactionRequest[]): void {
    // TODO: To being removed
    transactions = transactions.map((transaction) => ({
      ...transaction,
      description: transaction?.name,
      name: undefined,
    }));

    this.personalTransactionsService.createMultipleUserTransactions(transactions).subscribe({
      next: () => {
        this.notificationService.addNotification({
          type: 'success',
          message: 'Transactions imported successfully',
        });
        this.reloadPageService.reloadPage('/dashboard');
      },
      error: (err) => {
        this.notificationService.addNotification({
          type: 'error',
          message: 'Error occured while importing transactions',
        });
      },
    });
  }
}
