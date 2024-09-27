import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TransactionsMocks } from '@app/core/mocks/transactions.mocks';

@Component({
  selector: 'fin-man-transaction-panel',
  templateUrl: './fin-man-transaction-panel.component.html',
  styleUrls: ['./fin-man-transaction-panel.scss'],
})
export class FinManTransactionPanelComponent {
  control = new FormControl('');

  transactions = TransactionsMocks;
}
