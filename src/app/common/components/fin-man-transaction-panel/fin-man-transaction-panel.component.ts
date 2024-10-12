import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ExtendedTransaction, Transaction } from '@app/core/interfaces/transaction.schema';
import { ExtendedTransactionsMocks, TransactionsMocks } from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'fin-man-transaction-panel',
  templateUrl: './fin-man-transaction-panel.component.html',
  styleUrls: ['./fin-man-transaction-panel.scss'],
})
export class FinManTransactionPanelComponent implements OnInit {
  @Input() extendedPanel: boolean = false;

  @Output() openModal = new EventEmitter<void>();

  control = new FormControl('');

  transactions!: Transaction[] | ExtendedTransaction[];

  ngOnInit(): void {
    console.log('extendedPanel', this.extendedPanel);

    this.transactions = this.extendedPanel ? ExtendedTransactionsMocks : TransactionsMocks;
  }
}
