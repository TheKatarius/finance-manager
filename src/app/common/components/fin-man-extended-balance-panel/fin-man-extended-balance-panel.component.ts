import { Component } from '@angular/core';
import { COLORS } from '@app/core/constants/colors.const';

@Component({
  selector: 'fin-man-extended-balance-panel',
  templateUrl: './fin-man-extended-balance-panel.component.html',
  styleUrls: ['./fin-man-extended-balance-panel.scss'],
})
export class FinManExtendedBalancePanelComponent {
  readonly COLORS = COLORS;

  // Mockowane dane kont
  incomeAccounts: string[] = ['Salary Account', 'Freelance Income', 'Rental Income'];
  expenseAccounts: string[] = ['Food Expenses', 'Transport Expenses', 'Entertainment'];
  savingsAccounts: string[] = ['Emergency Fund', 'Retirement Savings', 'Investment Account'];

  totalIncome: number = 10000;
  totalExpense: number = 12521;
  totalSavings: number = 52103;

  selectedIncomeAccount!: string;
  selectedExpenseAccount!: string;
  selectedSavingsAccount!: string;

  // TODO: Add calculating this number
  percentDifference: number = 25;

  incomeBalance: number = 0;
  expenseBalance: number = 0;
  savingsBalance: number = 0;
  totalBalance: number = 0;

  checkboxValue: boolean = false;

  ngOnInit(): void {
    this.loadAccounts();
  }

  // Funkcja inicjalizująca dane i wybierająca domyślne konta
  loadAccounts(): void {
    // Ustawienie domyślnie wybranego konta dla przychodów, wydatków i oszczędności
    this.selectedIncomeAccount = this.incomeAccounts[0];
    this.selectedExpenseAccount = this.expenseAccounts[0];
    this.selectedSavingsAccount = this.savingsAccounts[0];

    // Aktualizacja bilansów na podstawie domyślnych kont
    this.updateBalance('income');
    this.updateBalance('expense');
    this.updateBalance('savings');
  }

  // Funkcja do aktualizacji bilansu na podstawie wybranego konta
  updateBalance(category: string): void {
    switch (category) {
      case 'income':
        // Pobieranie salda dla wybranego konta przychodów
        this.incomeBalance = this.mockGetBalance(this.selectedIncomeAccount);
        break;
      case 'expense':
        // Pobieranie salda dla wybranego konta wydatków
        this.expenseBalance = this.mockGetBalance(this.selectedExpenseAccount);
        break;
      case 'savings':
        // Pobieranie salda dla wybranego konta oszczędności
        this.savingsBalance = this.mockGetBalance(this.selectedSavingsAccount);
        break;
    }
    this.updateTotalBalance(); // Aktualizacja łącznego bilansu
  }

  // Funkcja do aktualizacji łącznego bilansu
  updateTotalBalance(): void {
    this.totalBalance = this.incomeBalance - this.expenseBalance + this.savingsBalance;
  }

  // Mockowana funkcja zwracająca saldo konta na podstawie jego nazwy
  mockGetBalance(accountName: string): number {
    const mockBalances: Record<string, number> = {
      'Salary Account': 5000,
      'Freelance Income': 2000,
      'Rental Income': 1500,
      'Food Expenses': 300,
      'Transport Expenses': 150,
      Entertainment: 200,
      'Emergency Fund': 10000,
      'Retirement Savings': 15000,
      'Investment Account': 12000,
    };
    return mockBalances[accountName] || 0; // Zwraca saldo lub 0, jeśli konto nie jest w mocku
  }

  getPercentDifferenceStyle(percentDifference: number): Record<string, string> {
    return percentDifference > 0
      ? { color: COLORS.accentGreen }
      : percentDifference === 0
      ? { color: COLORS.textMain }
      : { color: COLORS.accentRed };
  }

  displayPercentDifference(percentDifference: number): string {
    let char: string = '';
    if (percentDifference > 0) {
      char = '+';
    } else if (percentDifference < 0) {
      char = '-';
    }

    return char + percentDifference + '%';
  }

  toggleCheckbox(): void {
    this.checkboxValue = !this.checkboxValue;
  }
}
