// asset-modal.component.ts
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { Asset, AssetFormControls, AssetType, Portfolio } from '@app/core/interfaces/asset.schema';
import { InvestmentPortfolioFormGroupService } from '@app/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.service';

@Component({
  selector: 'finance-manager-investment-portfolio-modal',
  templateUrl: './investment-portfolio-modal.component.html',
  styleUrls: [
    '../../../css/components/investment-portfolio/investment-portfolio-modal/investment-portfolio-modal.scss',
  ],
  providers: [InvestmentPortfolioFormGroupService],
})
export class InvestmentPortfolioModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() assetData: Asset[] = []; // Dane aktywów do edycji (opcjonalne)
  @Input() assetTypesData: AssetType[] = [];
  @Input() portfolioData: Portfolio[] = []; // Dane portfela do edycji (opcjonalne)

  @Output() close = new EventEmitter<void>();
  @Output() assetAdded = new EventEmitter<any>();
  @Output() assetUpdated = new EventEmitter<any>();

  readonly VALIDATION = VALIDATION;
  readonly Object = Object;

  private investmentPortfolioFormGroupService = inject(InvestmentPortfolioFormGroupService);

  assetFormGroup!: FormGroup<AssetFormControls>;

  ngOnInit(): void {
    this.assetFormGroup = this.investmentPortfolioFormGroupService.createInvestmentPortfolioAsset();
  }

  closeModal(): void {
    this.close.emit();
    this.assetFormGroup.reset();
  }

  onSubmit(): void {
    console.log(this.assetFormGroup);
    if (this.assetFormGroup.valid) {
      const assetData = this.assetFormGroup.value;
      if (this.assetData) {
        // Aktualizacja istniejącego aktywu
        this.assetUpdated.emit({ ...this.assetData, ...assetData });
      } else {
        // Dodanie nowego aktywu
        assetData.createdAt = new Date().toISOString();
        assetData.updatedAt = new Date().toISOString();
        this.assetAdded.emit(assetData);
      }
      this.assetFormGroup.reset();
      this.closeModal();
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
