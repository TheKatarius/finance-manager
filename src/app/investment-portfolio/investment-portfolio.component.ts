import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AssetService } from '@app/core/data/assets.service';
import { PortfolioService } from '@app/core/data/portfolios.service';
import { Asset, AssetType, Portfolio } from '@app/core/interfaces/asset.schema';

@Component({
  selector: 'finance-manager-investment-portfolio',
  templateUrl: './investment-portfolio.component.html',
  styleUrls: ['../../css/components/investment-portfolio/investment-portfolio.scss'],
})
export class InvestmentPortfolioComponent implements OnInit {
  private assetService = inject(AssetService);
  private portfolioService = inject(PortfolioService);

  isLoading: boolean = true;

  isModalVisible: boolean = false;
  isPortfolioModalVisible: boolean = false;

  portfolioData: Portfolio[] = [];
  portfolioId: string = '';

  assetTypesData: AssetType[] = [];
  selectedAssetTypeId: string | null = null;

  assets: Asset[] = [];
  selectedAsset: Asset | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin([this.assetService.getAssetTypes(), this.portfolioService.getPortfolios()]).subscribe({
      next: ([assetTypes, portfolios]) => {
        this.assetTypesData = assetTypes.data
          .filter((assetType) => assetType.id <= 4)
          .sort((a, b) => a.id - b.id);

        this.portfolioData = portfolios.data ?? [];
        console.log('this.portfolioData: ', this.portfolioData);

        if (this.portfolioData.length) {
          this.portfolioId = this.portfolioData[0].id;
        }

        if (this.portfolioId) {
          this.assetService.getAssetsByPortfolioId(this.portfolioId).subscribe((assets) => {
            this.assets = assets;
          });
        }

        this.assetService.searchInstruments('app', 1).subscribe();
      },
      error: (error) => {
        console.error('Error loading data:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Obsługa zmiany filtrowania przez assetTypeId
  onAssetTypeChange(assetTypeId: string): void {
    this.selectedAssetTypeId = assetTypeId;
  }

  // Otwórz modal do tworzenia lub edycji aktywu
  openModal(asset?: Asset): void {
    this.selectedAsset = asset || null;
    this.isModalVisible = true;
  }

  // Zamknij modal
  closeModal(): void {
    this.isModalVisible = false;
    this.selectedAsset = null;
  }

  // Otwórz modal do tworzenia lub edycji aktywu
  openPortfolioModal(asset?: Asset): void {
    this.isPortfolioModalVisible = true;
  }

  // Zamknij modal
  closePortfolioModal(): void {
    this.isPortfolioModalVisible = false;
  }

  handlePortfolioAdded(newPortfolio: Portfolio): void {
    this.portfolioService.createPortfolio(newPortfolio).subscribe(() => {
      this.closePortfolioModal();
    });
  }

  // Obsługa dodania nowego aktywu
  handleAssetAdded(newAsset: Asset): void {
    this.assetService.createAsset(newAsset).subscribe(() => {
      this.closeModal();
    });
  }

  // Obsługa aktualizacji istniejącego aktywu
  handleAssetUpdated(updatedAsset: Asset): void {
    const index = this.assets.findIndex((asset) => asset.id === updatedAsset.id);
    if (index !== -1) {
      this.assets[index] = updatedAsset;
    }
    this.closeModal();
  }

  // Usunięcie aktywu
  deleteAsset(asset: Asset): void {
    const assetId = asset.id;
    this.assetService.deleteAsset(assetId).subscribe();
  }
}
