import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ASSET_HEADERS } from '@app/core/constants/asset-types-columns.const';
import { Asset, AssetType, Portfolio } from '@app/core/interfaces/asset.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { AssetsMocks } from '@app/core/mocks/investment-portfolio.mocks';

@Component({
  selector: 'fin-man-dynamic-investment-panel',
  templateUrl: './fin-man-dynamic-investment-panel.component.html',
  styleUrls: ['./fin-man-dynamic-investment-panel.scss'],
})
export class FinManDynamicInvestmentPanelComponent implements OnInit {
  @Input() portfolioData: Portfolio[] = [];
  @Input() assetTypesData: AssetType[] = [];

  @Output() openModal = new EventEmitter<void>();
  @Output() openPortfolioModal = new EventEmitter<void>();
  @Output() deleteAsset = new EventEmitter<Asset>();
  @Output() editAsset = new EventEmitter<Asset>();

  readonly CategoryKind = CategoryKind;
  readonly CrudOperations = CrudOperations;
  readonly assetHeaders = ASSET_HEADERS;

  searchControl = new FormControl('');

  portfolioDataNames: string[] = [];

  assetTypeNames: string[] = [];
  assetTypeIds: number[] = [];
  selectedAssetType: number = 1;

  assetData: Asset[] = AssetsMocks;

  ngOnInit(): void {
    console.log('this.portfolioData: ', this.portfolioData);
    console.log('this.assetTypesData: ', this.assetTypesData);

    this.portfolioDataNames = this.portfolioData.map((portfolio) => portfolio.name) ?? ['abc'];

    this.assetTypeNames = this.assetTypesData.map((assetType) => assetType.type);

    this.assetTypeIds = this.assetTypesData.map((assetType) => assetType.id);
  }

  get getPanelTitle(): string {
    return 'Purchased ' + this.selectedAssetType + 's';
  }

  handleAssetTypeChange(assetType: number): void {
    this.selectedAssetType = assetType;
  }

  handleOptionSelected(option: CrudOperations, asset: Asset): void {
    if (option === CrudOperations.EDIT) {
      this.editAsset.emit(asset);
    } else if (option === CrudOperations.DELETE) {
      this.deleteAsset.emit(asset);
    }
  }
}
