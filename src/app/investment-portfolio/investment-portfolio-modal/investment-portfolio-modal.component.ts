// asset-modal.component.ts
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AssetTypeMap } from '@app/core/constants/assets.const';
import { AssetFormControls, AssetTypes } from '@app/core/interfaces/asset.schema';
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
  @Input() assetData: any = null; // Dane aktywów do edycji (opcjonalne)

  @Output() close = new EventEmitter<void>();
  @Output() assetAdded = new EventEmitter<any>();
  @Output() assetUpdated = new EventEmitter<any>();

  private investmentPortfolioFormGroupService = inject(InvestmentPortfolioFormGroupService);

  assetFormGroup!: FormGroup<AssetFormControls>;

  ngOnInit(): void {
    this.assetFormGroup = this.investmentPortfolioFormGroupService.createInvestmentPortfolioAsset();

    if (this.assetData) {
      this.assetFormGroup.patchValue(this.assetData);
    }
  }

  private loadData(): void {}

  closeModal(): void {
    this.close.emit();
    this.assetFormGroup.reset();
  }

  onSubmit(): void {
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

  get assetTypeKeys(): number[] {
    return Object.keys(AssetTypeMap).map((key) => +key);
  }

  protected readonly Object = Object;
  protected readonly AssetTypeMap = AssetTypeMap;
  protected readonly AssetTypes = AssetTypes;
}
