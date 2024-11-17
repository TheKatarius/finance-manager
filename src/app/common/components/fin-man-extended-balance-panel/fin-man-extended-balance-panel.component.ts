import { Component, Input, OnInit } from '@angular/core';

import { COLORS } from '@app/core/constants/colors.const';
import { PersonalTransaction } from '@app/core/interfaces/personal-transactions.schema';

@Component({
  selector: 'fin-man-extended-balance-panel',
  templateUrl: './fin-man-extended-balance-panel.component.html',
  styleUrls: ['./fin-man-extended-balance-panel.scss'],
})
export class FinManExtendedBalancePanelComponent implements OnInit {
  @Input() personalTransactions: PersonalTransaction[] = [];
  @Input() incomeCategoryIds: number[] = [];
  @Input() incomeCategoryNames: string[] = [];
  @Input() expenseCategoryIds: number[] = [];
  @Input() expenseCategoryNames: string[] = [];

  readonly COLORS = COLORS;

  totalIncome: number = 0;
  totalExpense: number = 0;
  totalSavings: number = 0;

  selectedIncomeAccount!: number;
  selectedExpenseAccount!: number;

  incomeBalance: number = 0;
  expenseBalance: number = 0;

  checkboxValues: { id: number; value: boolean }[] = [
    { id: 0, value: false },
    { id: 1, value: false },
    { id: 2, value: false },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  // Funkcja inicjalizująca dane i wybierająca domyślne konta
  loadData(): void {
    this.totalIncome = Number(
      this.personalTransactions
        .reduce(
          (acc, transaction) => (transaction.type === 'income' ? acc + transaction.amount : acc),
          0,
        )
        .toFixed(2),
    );

    this.totalExpense = Number(
      this.personalTransactions
        .reduce(
          (acc, transaction) => (transaction.type === 'expense' ? acc + transaction.amount : acc),
          0,
        )
        .toFixed(2),
    );

    this.totalSavings = this.personalTransactions.reduce(
      (acc, transaction) =>
        transaction.predefined_category_id === 18 ? acc + transaction.amount : acc,
      0,
    );

    // Aktualizacja bilansów na podstawie domyślnych kont
    this.updateBalance(this.incomeCategoryIds[0], 'income');
    this.updateBalance(this.expenseCategoryIds[0], 'expense');
  }

  // Funkcja do aktualizacji bilansu na podstawie wybranego konta
  updateBalance(categoryId: number, type: string): void {
    if (type === 'income') {
      this.selectedIncomeAccount = categoryId;
    } else if (type === 'expense') {
      this.selectedExpenseAccount = categoryId;
    }

    switch (type) {
      case 'income':
        // Pobieranie salda dla wybranego konta przychodów
        this.incomeBalance = this.personalTransactions.reduce(
          (acc, transaction) =>
            transaction.type === 'income' &&
            transaction.predefined_category_id === this.selectedIncomeAccount
              ? acc + transaction.amount
              : acc,
          0,
        );
        break;
      case 'expense':
        // Pobieranie salda dla wybranego konta wydatków
        this.expenseBalance = this.personalTransactions.reduce(
          (acc, transaction) =>
            transaction.type === 'expense' &&
            transaction.predefined_category_id === this.selectedExpenseAccount
              ? acc + transaction.amount
              : acc,
          0,
        );
        break;
    }
  }

  toggleCheckbox(id: number): void {
    this.checkboxValues[id].value = !this.checkboxValues[id].value;
  }
}
