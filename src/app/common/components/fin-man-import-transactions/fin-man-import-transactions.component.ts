import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import * as Papa from 'papaparse';

import { ING_COLUMN_NAMES } from '@app/core/constants/bank-import-column-names.const';
import { COLORS } from '@app/core/constants/colors.const';
import { BankList } from '@app/core/interfaces/bank-list.schema';
import { PaymentSource, Transaction } from '@app/core/interfaces/transaction.schema';
import { ExpenseCategoryNames } from '@app/core/interfaces/category-names.schema';

@Component({
  selector: 'fin-man-import-transactions',
  templateUrl: './fin-man-import-transactions.component.html',
  styleUrls: ['./fin-man-import-transactions.scss'],
})
export class FinManImportTransactionsComponent implements OnInit {
  readonly BankList = BankList;

  readonly COLORS = COLORS;

  private elementRef = inject(ElementRef);

  csvData: any[] = [];

  transactions: Transaction[] = [];

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

    const transactions: Transaction[] = [];
    for (let i = headerRowIndex + 1; i < this.csvData.length; i++) {
      const row = this.csvData[i];

      const transaction: Transaction = {
        name: row[columnRows[this.columnNames[1]]],
        date: row[columnRows[this.columnNames[0]]],
        amount: row[columnRows[this.columnNames[3]]] || row[columnRows[this.columnNames[5]]],
        currencyIsoCode:
          row[columnRows[this.columnNames[4]]] || row[columnRows[this.columnNames[5]] + 1],
        category: ExpenseCategoryNames.Other,
        paymentSource: PaymentSource.BANK_ACCOUNT,
        currencyFullName: '',
        description: row[columnRows[this.columnNames[2]]],
        time: '00:00',
      };

      transactions.push(transaction);
    }

    for (let i = 0; i < transactions.length; i++) {
      if (
        !transactions[i].name ||
        !transactions[i].date ||
        !transactions[i].amount ||
        !transactions[i].currencyIsoCode
      ) {
        transactions.splice(i, 1);
      }
    }

    console.log(transactions);
  }
}
