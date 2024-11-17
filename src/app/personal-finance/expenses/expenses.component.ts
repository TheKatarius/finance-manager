import { Component, inject, OnInit } from '@angular/core';
import { PersonalEnumsService } from '@app/core/data/personal-enums.service';
import { PersonalTransactionsService } from '@app/core/data/personal-transactions.service';
import {
  Category,
  PaymentMethod,
  PersonalTransaction,
} from '@app/core/interfaces/personal-transactions.schema';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'finance-manager-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['../../../css/components/personal-finance/expenses/expenses.scss'],
})
export class ExpensesComponent implements OnInit {
  private personalTransactionsService = inject(PersonalTransactionsService);
  private personalEnumsService = inject(PersonalEnumsService);

  isModalVisible: boolean = false;
  isLoading = true;

  allTransactions: PersonalTransaction[] = [];
  personalTransactions: PersonalTransaction[] = [];
  paymentMethods: PaymentMethod[] = [];

  incomeCategories: Category[] = [];
  incomeCategoryIds: number[] = [];
  incomeCategoryNames: string[] = [];

  expenseCategories: Category[] = [];
  expenseCategoryIds: number[] = [];
  expenseCategoryNames: string[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin([
      this.personalTransactionsService.getUserTransactions(),
      this.personalEnumsService.getPredefinedCategories(),
      this.personalEnumsService.getPredefinedPaymentMethods(),
    ]).subscribe({
      next: ([personalTransactions, categories, paymentMethods]) => {
        this.allTransactions = personalTransactions.data;

        this.personalTransactions = personalTransactions.data.filter(
          (transaction) => transaction.type === 'expense',
        );

        this.paymentMethods = paymentMethods.methods;

        this.expenseCategories = categories.categories.filter(
          (category) => category.type === 'expense',
        );

        this.expenseCategoryIds = categories.categories
          .filter((category) => category.type === 'expense')
          .map((category) => category.id);

        this.expenseCategoryNames = categories.categories
          .filter((category) => category.type === 'expense')
          .map((category) => category.name);

        this.incomeCategories = categories.categories.filter(
          (category) => category.type === 'income',
        );

        this.incomeCategoryIds = categories.categories
          .filter((category) => category.type === 'income')
          .map((category) => category.id);

        this.incomeCategoryNames = categories.categories
          .filter((category) => category.type === 'income')
          .map((category) => category.name);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error while fetching data: ', err);
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
