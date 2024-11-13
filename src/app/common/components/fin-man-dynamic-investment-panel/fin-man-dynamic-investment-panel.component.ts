import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  ASSET_HEADERS,
  mapAssetToBondTable,
  mapAssetToEtfTable,
  mapAssetToStockTable,
} from '@app/core/constants/asset-types-columns.const';
import { AssetTransactionsService } from '@app/core/data/asset-transactions.service';
import { AssetService } from '@app/core/data/assets.service';
import {
  Asset,
  AssetBondTable,
  AssetEtfTable,
  AssetStockTable,
  AssetTransaction,
  AssetTransactionSnakeCase,
  AssetType,
  Portfolio,
} from '@app/core/interfaces/asset.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { Transaction } from '@app/core/interfaces/transaction.schema';

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
  private assetTransactionsService = inject(AssetTransactionsService);

  searchControl = new FormControl('');

  portfolioId: string = '';
  portfolioDataIds: string[] = [];
  portfolioDataNames: string[] = [];

  assetTypeNames: string[] = [];
  assetTypeIds: number[] = [];
  selectedAssetType: number = 1;

  stockAssetData: AssetStockTable[] = [];
  bondAssetData: AssetBondTable[] = [];
  etfAssetData: AssetEtfTable[] = [];

  // Keep track of expanded assets by their IDs
  expandedAssetIds: string[] = [];

  // Store transactions for each asset
  assetTransactions: { [assetId: string]: AssetTransactionSnakeCase[] } = {};

  ngOnInit(): void {
    this.portfolioId = this.portfolioData[0]?.id ?? '';
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
    return 'Purchased ' + selectedAssetName + 's';
  }

  handlePortfolioChange(portfolioId: string): void {
    console.log('Portfolio changed: ', portfolioId);
    this.portfolioId = portfolioId;
    this.assetService.getAssetsByPortfolioId(portfolioId).subscribe((assets) => {
      this.assetData = assets.data;
      this.setFilteredAssetData();
    });
  }

  handleAssetTypeChange(assetType: number): void {
    this.selectedAssetType = assetType;
  }

  handleOptionSelected(
    option: CrudOperations,
    asset: AssetStockTable | AssetBondTable | AssetEtfTable,
  ): void {
    const foundAsset = this.assetData.find((a) => a.ID === asset.ID);

    if (option === CrudOperations.EDIT) {
      this.editAsset.emit(foundAsset);
    } else if (option === CrudOperations.DELETE) {
      this.deleteAsset.emit(foundAsset);
    }
  }

  // Method to toggle the expanded state of an asset
  toggleAsset(asset: AssetStockTable | AssetBondTable | AssetEtfTable): void {
    console.log('Toggling asset:', asset);

    const index = this.expandedAssetIds.indexOf(asset.ID);
    if (index > -1) {
      this.expandedAssetIds.splice(index, 1);
    } else {
      this.expandedAssetIds.push(asset.ID);
      console.log('Fetching transactions for asset:', asset);

      if (!this.assetTransactions[asset.ID]) {
        this.fetchTransactionsForAsset(asset);
      }
    }
  }

  // Check if an asset is expanded
  isAssetExpanded(asset: AssetStockTable | AssetBondTable | AssetEtfTable): boolean {
    return this.expandedAssetIds.includes(asset.ID);
  }

  // Fetch transactions for a specific asset
  fetchTransactionsForAsset(asset: AssetStockTable | AssetBondTable | AssetEtfTable): void {
    this.assetTransactionsService
      .getTransactionsForAsset(this.portfolioId, asset.ID)
      .subscribe((response) => {
        this.assetTransactions[asset.ID] = response.data; // Adjust based on your API response structure
        console.log('Transactions for asset:', this.assetTransactions[asset.ID]);
      });
  }

  private setFilteredAssetData(): void {
    this.stockAssetData = this.assetData
      .map((asset) => mapAssetToStockTable(asset))
      .filter((asset) => asset !== null) as AssetStockTable[];

    this.bondAssetData = this.assetData
      .map((asset) => mapAssetToBondTable(asset))
      .filter((asset) => asset !== null) as AssetBondTable[];

    this.etfAssetData = this.assetData
      .map((asset) => mapAssetToEtfTable(asset))
      .filter((asset) => asset !== null) as AssetEtfTable[];
  }

  log(data: any): void {
    console.log(data);
  }
}
