import { Component } from '@angular/core';
import { AssetsMocks } from '@app/core/mocks/investment-portfolio.mocks';

@Component({
  selector: 'finance-manager-investment-portfolio',
  templateUrl: './investment-portfolio.component.html',
  styleUrls: ['../../css/components/investment-portfolio/investment-portfolio.scss'],
})
export class InvestmentPortfolioComponent {
  isModalVisible: boolean = false;
  selectedAsset: any = null;

  openModal(asset?: any): void {
    this.selectedAsset = asset || null;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedAsset = null;
  }

  handleAssetAdded(newAsset: any): void {
    AssetsMocks.push(newAsset);
    // Możesz również zaktualizować dane na serwerze lub w stanie aplikacji
  }

  handleAssetUpdated(updatedAsset: any): void {
    const index = AssetsMocks.findIndex((asset) => asset.id === updatedAsset.id);
    if (index !== -1) {
      AssetsMocks[index] = updatedAsset;
      // Aktualizacja na serwerze lub w stanie aplikacji
    }
  }
}
