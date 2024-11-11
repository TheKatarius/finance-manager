import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AssetService } from '@app/core/data/assets.service';
import { PortfolioService } from '@app/core/data/portfolios.service';
import { Asset, AssetType, CreateAssetRequest, Portfolio } from '@app/core/interfaces/asset.schema';
import { NotificationService } from '@app/core/services/notifications.service';
import { InvestmentPortfolioService } from './investment-portfolio.service';

@Component({
  selector: 'finance-manager-investment-portfolio',
  templateUrl: './investment-portfolio.component.html',
  styleUrls: ['../../css/components/investment-portfolio/investment-portfolio.scss'],
})
export class InvestmentPortfolioComponent implements OnInit {
  private assetService = inject(AssetService);
  private portfolioService = inject(PortfolioService);
  private notificationService = inject(NotificationService);
  private investmentPortfolioService = inject(InvestmentPortfolioService);

  isLoading: boolean = true;

  isModalVisible: boolean = false;
  isPortfolioModalVisible: boolean = false;
  isTransactionModalVisible: boolean = false;

  portfolioData: Portfolio[] = [];
  portfolioId: string = '';

  assetTypesData: AssetType[] = [];
  selectedAssetTypeId: string | null = null;

  assetData: Asset[] = [];
  selectedAsset: Asset | null = null;

  isEdit: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin([this.assetService.getAssetTypes(), this.portfolioService.getPortfolios()]).subscribe({
      next: ([assetTypes, portfolios]) => {
        this.assetTypesData = assetTypes.data
          .filter((assetType) => assetType.id <= 3)
          .sort((a, b) => a.id - b.id);

        this.portfolioData = portfolios.data ?? [];
        console.log('this.portfolioData: ', this.portfolioData);

        if (this.portfolioData.length) {
          this.portfolioId = this.portfolioData[0].id;
        }

        if (this.portfolioId) {
          this.assetService.getAssetsByPortfolioId(this.portfolioId).subscribe((assets) => {
            this.assetData = assets.data;
          });
        }
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
    if (asset) {
      this.isEdit = true;
    }
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

  openTransactionModal(asset?: Asset): void {
    this.isTransactionModalVisible = true;
  }

  // Zamknij modal
  closeTransactionModal(): void {
    this.isTransactionModalVisible = false;
  }

  // Obsługa dodania nowego aktywu
  handleAssetAdded(newAsset: Asset): void {
    const request = this.createRequestForAssetType(newAsset);

    this.assetService.createAsset(newAsset.PortfolioID, request).subscribe({
      next: (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.notificationService.addNotification({
            type: 'success',
            message: 'Asset added successfully',
          });

          this.closeModal();
          this.investmentPortfolioService.reloadInvestmentPortfolioPage();
        }
      },
      error: (error) => {
        console.log('Error adding asset:', error);
        this.notificationService.addNotification({
          type: 'error',
          message: error.error?.message || 'Failed to add asset',
        });
      },
    });
  }

  // Obsługa aktualizacji istniejącego aktywu
  handleAssetUpdated(updatedAsset: Asset): void {
    const index = this.assetData.findIndex((asset) => asset.ID === updatedAsset.ID);
    if (index !== -1) {
      this.assetData[index] = updatedAsset;
    }
    this.closeModal();
  }

  // TODO: Change any to CreateAssetRequest when seba fix property names
  createRequestForAssetType(asset: Asset): CreateAssetRequest | any {
    const baseProperties = {
      asset_type_id: asset.AssetTypeID,
      name: asset.Name,
      ticker: asset.Ticker,
      currency: asset.Currency.split(' ')[0],
    };

    switch (asset.AssetTypeID) {
      // Stocks
      case 1:
        return {
          ...baseProperties,
          dividend_yield: asset.DividendYield,
          exchange: asset.ExchangeShort,
        };
      // Bonds
      case 2:
        return {
          ...baseProperties,
          coupon_rate: asset.CouponRate,
          face_value: asset.FaceValue,
          maturity_date: asset.MaturityDate,
        };
      // ETFs
      case 3:
        return {
          ...baseProperties,
          accumulation: asset.Accumulation,
          exchange: asset.ExchangeShort,
        };
      default:
        console.error('Unknown asset type');
    }
  }

  // Usunięcie aktywu
  deleteAsset(asset: Asset): void {
    this.assetService.deleteAsset(asset.ID).subscribe();
  }
}
