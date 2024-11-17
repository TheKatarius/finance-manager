import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import * as Papa from 'papaparse';

import { ING_COLUMN_NAMES } from '@app/core/constants/bank-import-column-names.const';
import { COLORS } from '@app/core/constants/colors.const';
import { BankList } from '@app/core/interfaces/bank-list.schema';
import {
  PersonalTransaction,
  PersonalTransactionRequest,
} from '@app/core/interfaces/personal-transactions.schema';

@Component({
  selector: 'fin-man-import-transactions',
  templateUrl: './fin-man-import-transactions.component.html',
  styleUrls: ['./fin-man-import-transactions.scss'],
})
export class FinManImportTransactionsComponent implements OnInit {
  @Output() emitImportedTransactions = new EventEmitter<PersonalTransactionRequest[]>();

  readonly BankList = BankList;
  readonly COLORS = COLORS;

  private elementRef = inject(ElementRef);

  csvData: any[] = [];

  transactions: PersonalTransaction[] = [];
  importTransactionsClicked: boolean = false;
  selectedBank: BankList = BankList.ING;

  columnNames: string[] = [];

  ngOnInit(): void {
    this.selectColumnName();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement; // Zidentyfikowanie klikniętego elementu

    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      !clickedElement.classList.contains('custom-dropdown-option')
    ) {
      this.importTransactionsClicked = false;
    }
  }

  private selectColumnName(): void {
    switch (this.selectedBank) {
      case BankList.ING:
        this.columnNames = ING_COLUMN_NAMES;
        break;
      default:
        this.columnNames = [];
    }
  }

  displayPopOver(): void {
    this.importTransactionsClicked = !this.importTransactionsClicked;
  }

  changeSelectedBank(bank: BankList): void {
    this.selectedBank = bank;
    this.selectColumnName();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: false, // Parsowanie jako tablice tablic
        skipEmptyLines: true,
        complete: (result) => {
          this.csvData = result.data;
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Wystąpił błąd podczas parsowania pliku CSV.');
        },
      });
    }
  }

  importTransactions(): void {
    if (this.csvData.length === 0) {
      alert('Brak danych do zaimportowania. Proszę wybrać plik CSV.');
      return;
    }

    // Znalezienie wiersza z komórką "Transaction Date"
    let headerRowIndex: number = 0;
    for (let i = 0; i < this.csvData.length; i++) {
      const row = this.csvData[i];
      const colIndex = row.findIndex(
        (cell: any) => cell.toString().trim().toLowerCase() === this.columnNames[0].toLowerCase(),
      );

      if (colIndex !== -1) {
        headerRowIndex = i;
        break;
      }
    }

    // Transaction date, Counterparty's data = name,Title = description, Transaction amount, Currency, Amount of hold/holds' releases
    // Let the user decide which account add the transactions to
    // Get index of columns with names from columnNames
    const columnRows: Record<string, number> = {};
    for (let i = 0; i < this.csvData[headerRowIndex].length; i++) {
      const cell = this.csvData[headerRowIndex][i].toString().trim().toLowerCase();

      if (this.columnNames.includes(cell) && !columnRows[cell]) {
        columnRows[cell] = i;
      }
    }

    let transactions: PersonalTransactionRequest[] = [];
    for (let i = headerRowIndex + 1; i < this.csvData.length; i++) {
      const row = this.csvData[i];

      const type =
        row[columnRows[this.columnNames[3]]]?.[0] === '-' ||
        row[columnRows[this.columnNames[5]]]?.[0] === '-'
          ? 'expense'
          : 'income';

      const transaction: PersonalTransactionRequest = {
        name: row[columnRows[this.columnNames[1]]]?.slice(0, 40),
        type,
        date: row[columnRows[this.columnNames[0]]]
          ? new Date(row[columnRows[this.columnNames[0]]])
          : new Date(),
        amount: (
          row[columnRows[this.columnNames[3]]] || row[columnRows[this.columnNames[5]]]
        )?.replace('-', ''),
        payment_method_id: 1,
        predefined_category_id: type === 'expense' ? 25 : 31,
        description: row[columnRows[this.columnNames[2]]]?.slice(0, 100),
      };

      transactions.push(transaction);
    }

    for (let i = 0; i < transactions.length; i++) {
      if (!transactions[i].name || !transactions[i].date || !transactions[i].amount) {
        transactions.splice(i, 1);
      }
    }

    transactions = transactions.map((transaction) => ({
      ...transaction,
      amount: Number((transaction.amount as unknown as string)?.replace(',', '.')),
    }));

    console.log('csvTransactions: ', transactions);
    this.emitImportedTransactions.emit(transactions);

    this.displayPopOver();
  }
}
