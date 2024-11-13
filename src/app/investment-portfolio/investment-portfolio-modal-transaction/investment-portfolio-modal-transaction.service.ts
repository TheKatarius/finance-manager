// investment-portfolio-modal-transaction.service.ts
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetTransactionFormControls } from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class InvestmentPortfolioModalTransactionService {
  createTransactionForm(): FormGroup<AssetTransactionFormControls> {
    return new FormGroup<AssetTransactionFormControls>({
      PortfolioID: new FormControl(null),
      AssetID: new FormControl(null),
      TransactionTypeID: new FormControl(null),
      CurrentValue: new FormControl(null),
      Price: new FormControl(null),
      Quantity: new FormControl(null),
      TransactionDate: new FormControl(new Date().toISOString().split('T')[0]),
    });
  }
}
