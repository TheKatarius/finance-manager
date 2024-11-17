import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CurrenciesMocks } from '@app/core/constants/currencies.const';
import { VALIDATION } from '@app/core/constants/validators.const';
import { AssetService } from '@app/core/data/assets.service';
import {
  Asset,
  AssetFormControls,
  AssetType,
  Portfolio,
  VerifiedTicker,
  VerifiedTickerResponse,
} from '@app/core/interfaces/asset.schema';
import { CodeValueItem } from '@app/core/interfaces/code-value.schema';
import { MergeCodeNamePipe } from '@app/core/pipes/merge-code-name.pipe';
import { ReloadPageService } from '@app/core/services/dashboard.service';
import { NotificationService } from '@app/core/services/notifications.service';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import { InvestmentPortfolioFormGroupService } from '@app/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finance-manager-investment-portfolio-modal',
  templateUrl: './investment-portfolio-modal.component.html',
  styleUrls: [
    '../../../css/components/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.scss',
  ],
  providers: [InvestmentPortfolioFormGroupService, MergeCodeNamePipe],
})
export class InvestmentPortfolioModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() assetToUpdate!: Asset | null; // Dane aktywów do edycji (opcjonalne)
  @Input() assetTypesData: AssetType[] = [];
  @Input() portfolioData: Portfolio[] = []; // Dane portfela do edycji (opcjonalne)
  @Input() isEdit: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() assetAdded = new EventEmitter<any>();
  @Output() assetUpdated = new EventEmitter<any>();

  readonly VALIDATION = VALIDATION;
  readonly Object = Object;

  private assetService = inject(AssetService);
  private investmentPortfolioFormGroupService = inject(InvestmentPortfolioFormGroupService);
  private mergeCodeNamePipe = inject(MergeCodeNamePipe);
  private notificationService = inject(NotificationService);
  private reloadPageService = inject(ReloadPageService);

  private searchInstrumentsSubscription = new Subscription();

  searchedAssets: VerifiedTicker[] = [];
  tickerAssets: string[] = [];

  assetFormGroup!: FormGroup<AssetFormControls>;

  currencies: string[] = CurrenciesMocks.map((currency) =>
    this.mergeCodeNamePipe.transform(currency),
  );
  defaultCurrency = this.mergeCodeNamePipe.transform(
    CurrenciesMocks.find((currency) => currency.code === 'PLN') as CodeValueItem,
  );

  ngOnInit(): void {
    this.assetFormGroup = this.assetToUpdate
      ? this.investmentPortfolioFormGroupService.createInvestmentPortfolioAsset(this.assetToUpdate)
      : this.investmentPortfolioFormGroupService.createInvestmentPortfolioAsset();

    this.assetFormGroup.patchValue({
      AssetTypeID: this.assetTypesData[0].id,
      PortfolioID: this.portfolioData[0].id,
      Currency: this.defaultCurrency,
    });
  }

  ngOnDestroy(): void {
    this.searchInstrumentsSubscription.unsubscribe();
  }

  onSearchChange(searchValue: string): void {
    this.searchInstrumentsSubscription = this.assetService
      .searchInstruments(searchValue, this.assetFormGroup.controls.AssetTypeID.value as number)
      .subscribe({
        next: (assets: VerifiedTickerResponse) => {
          this.searchedAssets = assets.data ?? [];
          this.tickerAssets = assets.data?.map((asset) => asset.Symbol) ?? [];
        },
      });
  }

  onTickerChange(ticker: string): void {
    const selectedAsset = this.searchedAssets.find((asset) => asset.Symbol === ticker);
    console.log(selectedAsset);

    if (selectedAsset) {
      this.assetFormGroup.patchValue({
        Ticker: selectedAsset.Symbol,
        Name: selectedAsset.Name,
        CurrentValue: selectedAsset.Price,
        Exchange: selectedAsset.Exchange,
        ExchangeShort: selectedAsset.ExchangeShort,
      });
    }
  }

  onAssetTypeChange(): void {
    this.searchedAssets = [];
    this.tickerAssets = [];
    this.assetFormGroup.controls.Ticker.reset();
    this.assetFormGroup.controls.Name.reset();
    this.assetFormGroup.controls.CurrentValue.setValue(0);
    this.assetFormGroup.controls.Exchange.reset();
    this.assetFormGroup.controls.ExchangeShort.reset();
  }

  closeModal(): void {
    this.close.emit();
    this.assetFormGroup.reset();
  }

  onSubmit(): void {
    if (validateFormGroup(this.assetFormGroup)) {
      console.log('Form is valid');

      const updatedAsset = this.assetFormGroup.value;
      if (this.assetToUpdate) {
        this.assetUpdated.emit({ ...this.assetToUpdate, ...updatedAsset });
      } else {
        console.log('Asset added: ', updatedAsset);

        this.assetAdded.emit(updatedAsset);
      }
    } else {
      this.notificationService.addNotification({
        type: 'error',
        message: 'Form is invalid',
      });
    }
  }

  get assetTypesDataIds(): number[] {
    return this.assetTypesData.map((assetType) => assetType.id);
  }

  get assetTypesDataTypes(): string[] {
    return this.assetTypesData.map((assetType) => assetType.type);
  }

  get portfolioDataIds(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.id);
  }

  get portfolioDataNames(): string[] {
    return this.portfolioData.map((portfolio) => portfolio.name);
  }
}
