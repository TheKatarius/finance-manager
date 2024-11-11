import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VALIDATION } from '@app/core/constants/validators.const';
import { InvestmentPortfolioModalTransactionService } from './investment-portfolio-modal-transaction.service';
import {
  Asset,
  AssetTransaction,
  AssetTransactionFormControls,
  AssetTransactionType,
  Portfolio,
} from '@app/core/interfaces/asset.schema';
import { AssetTransactionsService } from '@app/core/data/asset-transactions.service';
import { NotificationService } from '@app/core/services/notifications.service';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import { InvestmentPortfolioService } from '../investment-portfolio.service';

@Component({
  selector: 'finance-manager-investment-portfolio-modal-transaction',
  templateUrl: './investment-portfolio-modal-transaction.component.html',
  styleUrls: [
    '../../../css/components/investment-portfolio/investment-portfolio-modal-transactions/investment-portfolio-modal-transactions.scss',
  ],
})
export class InvestmentPortfolioModalTransactions {
  @Input() isVisible: boolean = false;
  @Input() transactionToUpdate!: AssetTransaction | null; // Dane transakcji do edycji (opcjonalne)
  @Input() portfolioData: Portfolio[] = []; // Dane portfela do edycji (opcjonalne)
  @Input() assetData: Asset[] = [];

  @Output() close: EventEmitter<void> = new EventEmitter();

  readonly VALIDATION = VALIDATION;

  transactionFormGroup!: FormGroup<AssetTransactionFormControls>;

  transactionTypes: AssetTransactionType[] = [];

  constructor(
    private formGroupService: InvestmentPortfolioModalTransactionService,
    private assetTransactionsService: AssetTransactionsService,
    private notificationService: NotificationService,
    private investmentPortfolioService: InvestmentPortfolioService,
  ) {}

  ngOnInit(): void {
    this.transactionFormGroup = this.formGroupService.createTransactionForm();
  }

  onSubmit(): void {
    if (validateFormGroup(this.transactionFormGroup)) {
      console.log('Form is valid');

      const formValues: AssetTransaction = this.transactionFormGroup.value as AssetTransaction;

      // TODO: Poprawić gdy seba poprawi property names
      const newTransaction: AssetTransaction | any = {
        transaction_type_id: formValues.TransactionTypeID,
        price: formValues.Price,
        quantity: formValues.Quantity,
        createdAt: formValues.CreatedAt,
      };

      this.assetTransactionsService
        .createTransaction(formValues.PortfolioID, formValues.AssetID, newTransaction)
        .subscribe({
          next: (transaction) => {
            this.notificationService.addNotification({
              type: 'success',
              message: 'Transaction created successfully',
            });
            this.closeModal();
            this.investmentPortfolioService.reloadInvestmentPortfolioPage();
          },
          error: (err) => {
            console.error(err);
            this.notificationService.addNotification({
              type: 'error',
              message: err.message || 'Failed to create transaction',
            });
          },
        });
    } else {
      this.notificationService.addNotification({
        type: 'error',
        message: 'Form is invalid',
      });
    }
  }

  closeModal(): void {
    this.close.emit();
    this.transactionFormGroup.reset();
  }

  onTransactionTypeChange(): void {
    // Opcjonalnie: obsłuż zmiany typu transakcji
    console.log('Selected Transaction Type ID:');
  }

  //   handlePortfolioChange(portfolioId: string): void {
  //     console.log('Portfolio changed: ', portfolioId);
  //     this.assetService.getAssetsByPortfolioId(portfolioId).subscribe((assets) => {
  //       this.assetData = assets.data;
  //       this.setFilteredAssetData();
  //     });
  //   }

  get portfolioDataIds(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.id);
  }

  get portfolioDataNames(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.name);
  }
}
