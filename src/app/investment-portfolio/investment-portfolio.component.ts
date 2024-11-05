import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  private route = inject(ActivatedRoute);

  isModalVisible: boolean = false;
  isPortfolioModalVisible: boolean = false;

  selectedAsset: Asset | null = null;
  assets: Asset[] = [];
  assetTypes: AssetType[] = [];
  selectedAssetTypeId: number | null = null;
  portfolioId: string = '';
  error: string = '';

  ngOnInit(): void {
    // Pobierz portfolioId z parametrów routingu lub innego źródła
    this.route.params.subscribe((params) => {
      this.portfolioId = params['portfolioId'];
      this.loadAssetTypes();
      this.loadAssets();
    });
  }

  // Pobierz typy aktywów do filtrowania
  loadAssetTypes(): void {
    this.assetService.getAssetTypes().subscribe(
      (data) => {
        this.assetTypes = data;
      },
      (err) => {
        this.error = err;
      },
    );
  }

  // Pobierz aktywa na podstawie portfolioId i opcjonalnie assetTypeId
  loadAssets(): void {
    this.assetService.getAssetsByPortfolioId(this.portfolioId).subscribe(
      (data) => {
        if (this.selectedAssetTypeId) {
          this.assets = data.filter((asset) => asset.assetTypeId === this.selectedAssetTypeId);
        } else {
          this.assets = data;
        }
      },
      (err) => {
        this.error = err;
      },
    );
  }

  // Obsługa zmiany filtrowania przez assetTypeId
  onAssetTypeChange(assetTypeId: number): void {
    this.selectedAssetTypeId = assetTypeId;
    this.loadAssets();
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
