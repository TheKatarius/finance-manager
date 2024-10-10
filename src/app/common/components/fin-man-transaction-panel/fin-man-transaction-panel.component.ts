import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TransactionsMockData } from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'fin-man-transaction-panel',
  templateUrl: './fin-man-transaction-panel.component.html',
  styleUrls: ['./fin-man-transaction-panel.scss'],
})
export class FinManTransactionPanelComponent {
  @Output() openModal = new EventEmitter<void>();

  control = new FormControl('');

  transactions = TransactionsMockData;
}
