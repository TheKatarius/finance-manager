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
import { AssetService } from '@app/core/data/assets.service';

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
    private assetService: AssetService,
  ) {}

  ngOnInit(): void {
    this.transactionFormGroup = this.formGroupService.createTransactionForm();

    this.transactionFormGroup.patchValue({
      TransactionTypeID: 1,
      PortfolioID: this.portfolioData[0].id,
      AssetID: this.assetData[0].ID,
      CurrentValue: this.assetData.find((asset) => asset.ID === this.assetData[0].ID)?.CurrentValue,
    });

    this.loadData();
  }

  loadData(): void {
    this.assetTransactionsService.getTransactionTypes().subscribe((transactionTypes) => {
      this.transactionTypes = transactionTypes.data
        .filter((transactionType) => transactionType.id <= 2)
        .sort((a, b) => a.id - b.id);
    });
  }

  onSubmit(): void {
    if (validateFormGroup(this.transactionFormGroup)) {
      console.log('Form is valid');

      const formValues: AssetTransaction = this.transactionFormGroup.value as AssetTransaction;

      // TODO: Poprawić gdy seba poprawi property names
      const newTransaction: AssetTransaction | any = {
        transaction_type_id: formValues.TransactionTypeID,
        price: Number(formValues.Price),
        quantity: Number(formValues.Quantity),
        transaction_date: formValues.TransactionDate,
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
              message: err.error?.message || 'Failed to create transaction',
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

  handlePortfolioChange(portfolioId: string): void {
    console.log('Portfolio changed: ', portfolioId);
    this.assetService.getAssetsByPortfolioId(portfolioId).subscribe((assets) => {
      this.assetData = assets.data;
    });
  }

  handleAssetChange(assetId: string): void {
    console.log('Asset changed: ', assetId);
    this.transactionFormGroup.patchValue({
      AssetID: assetId,
      CurrentValue: this.assetData.find((asset) => asset.ID === assetId)?.CurrentValue,
    });
  }

  get transactionTypesIds(): number[] {
    return this.transactionTypes.map((transactionType) => transactionType.id);
  }

  get transactionTypesNames(): string[] {
    return this.transactionTypes.map((transactionType) => transactionType.type);
  }

  get assetDataIds(): string[] {
    return this.assetData.map((asset) => asset.ID);
  }

  get assetDataNames(): string[] {
    return this.assetData.map((asset) => asset.Name);
  }

  get portfolioDataIds(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.id);
  }

  get portfolioDataNames(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.name);
  }
}
