import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Asset } from '@app/core/interfaces/asset.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { AssetsMocks } from '@app/core/mocks/investment-portfolio.mocks';

@Component({
  selector: 'fin-man-dynamic-investment-panel',
  templateUrl: './fin-man-dynamic-investment-panel.component.html',
  styleUrls: ['./fin-man-dynamic-investment-panel.scss'],
})
export class FinManDynamicInvestmentPanelComponent {
  @Output() openModal = new EventEmitter<void>();
  @Output() openPortfolioModal = new EventEmitter<void>();
  @Output() deleteAsset = new EventEmitter<Asset>();
  @Output() editAsset = new EventEmitter<Asset>();

  readonly CategoryKind = CategoryKind;

  readonly CrudOperations = CrudOperations;

  assetHeaders: string[] = [
    'Asset Name',
    'Ticker',
    'Dividend Yield',
    'Accumulation',
    'Total Quantity',
    'Average Purchase Price',
    'Total Invested',
    'Current Value',
    'Unrealized Gain/Loss',
    'Created At',
    'Updated At',
  ];

  searchControl = new FormControl('');

  assetTypeNames = ['Stock', 'ETF', 'Crypto', 'REIT', 'Mutual Fund', 'Bond', 'Commodity', 'Other'];
  selectedAssetType = 'Stock';

  assetData: Asset[] = AssetsMocks;

  get getPanelTitle(): string {
    return 'Purchased ' + this.selectedAssetType + 's';
  }

  handleOptionSelected(option: CrudOperations, asset: Asset): void {
    if (option === CrudOperations.EDIT) {
      this.editAsset.emit(asset);
    } else if (option === CrudOperations.DELETE) {
      this.deleteAsset.emit(asset);
    }
  }
}
