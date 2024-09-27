import { Component, Input } from '@angular/core';

import { Transaction } from '@app/core/interfaces/transaction.schema';

@Component({
  selector: 'fin-man-transaction-record',
  templateUrl: './fin-man-transaction-record.component.html',
  styleUrls: ['./fin-man-transaction-record.scss'],
})
export class FinManTransactionRecordComponent {
  @Input() transactions?: Transaction[];

  readonly parseInt = parseInt;
}
