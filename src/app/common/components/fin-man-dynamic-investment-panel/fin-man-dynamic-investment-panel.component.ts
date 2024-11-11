import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  ASSET_HEADERS,
  mapAssetToEtfTable,
  mapAssetToStockTable,
} from '@app/core/constants/asset-types-columns.const';
import { AssetService } from '@app/core/data/assets.service';
import {
  Asset,
  AssetEtfTable,
  AssetStockTable,
  AssetType,
  Portfolio,
} from '@app/core/interfaces/asset.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';

@Component({
  selector: 'fin-man-dynamic-investment-panel',
  templateUrl: './fin-man-dynamic-investment-panel.component.html',
  styleUrls: ['./fin-man-dynamic-investment-panel.scss'],
})
export class FinManDynamicInvestmentPanelComponent implements OnInit, OnChanges {
  @Input() portfolioData: Portfolio[] = [];
  @Input() assetTypesData: AssetType[] = [];
  @Input() assetData: Asset[] = [];

  @Output() openModal = new EventEmitter<void>();
  @Output() openPortfolioModal = new EventEmitter<void>();
  @Output() openTransactionModal = new EventEmitter<void>();
  @Output() deleteAsset = new EventEmitter<Asset>();
  @Output() editAsset = new EventEmitter<Asset>();

  readonly CategoryKind = CategoryKind;
  readonly CrudOperations = CrudOperations;
  readonly assetHeaders = ASSET_HEADERS;

  private assetService = inject(AssetService);

  searchControl = new FormControl('');

  portfolioDataIds: string[] = [];
  portfolioDataNames: string[] = [];

  assetTypeNames: string[] = [];
  assetTypeIds: number[] = [];
  selectedAssetType: number = 1;

  stockAssetData: AssetStockTable[] = [];
  etfAssetData: AssetEtfTable[] = [];

  ngOnInit(): void {
    this.portfolioDataIds = this.portfolioData?.map((portfolio) => portfolio?.id) ?? [];
    this.portfolioDataNames = this.portfolioData?.map((portfolio) => portfolio?.name) ?? [];

    this.assetTypeNames = this.assetTypesData?.map((assetType) => assetType.type);
    this.assetTypeIds = this.assetTypesData?.map((assetType) => assetType.id);

    this.selectedAssetType = this.assetTypeIds[0];
  }

  ngOnChanges(): void {
    this.setFilteredAssetData();
  }

  get getPanelTitle(): string {
    const selectedAssetName = this.assetTypeNames[this.selectedAssetType - 1];
    return 'Purchased ' + selectedAssetName;
  }

  handlePortfolioChange(portfolioId: string): void {
    console.log('Portfolio changed: ', portfolioId);
    this.assetService.getAssetsByPortfolioId(portfolioId).subscribe((assets) => {
      this.assetData = assets.data;
      this.setFilteredAssetData();
    });
  }

  handleAssetTypeChange(assetType: number): void {
    this.selectedAssetType = assetType;
  }

  handleOptionSelected(option: CrudOperations, asset: AssetStockTable | AssetEtfTable): void {
    const foundAsset = this.assetData.find((a) => a.ID === asset.ID);

    if (option === CrudOperations.EDIT) {
      this.editAsset.emit(foundAsset);
    } else if (option === CrudOperations.DELETE) {
      this.deleteAsset.emit(foundAsset);
    }
  }

  private setFilteredAssetData(): void {
    this.stockAssetData = this.assetData
      .map((asset) => mapAssetToStockTable(asset))
      .filter((asset) => asset !== null) as AssetStockTable[];

    this.etfAssetData = this.assetData
      .map((asset) => mapAssetToEtfTable(asset))
      .filter((asset) => asset !== null) as AssetEtfTable[];
  }
}
