import { Asset, AssetFormControls } from '@app/core/interfaces/asset.schema';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class InvestmentPortfolioFormGroupService {
  private formBuilder = inject(FormBuilder);

  createInvestmentPortfolioAsset(asset: Asset): FormGroup<AssetFormControls> {
    return this.formBuilder.group({
      portfolioId: asset.portfolioId ?? '',
      name: asset.name ?? '',
      ticker: asset.ticker ?? '',
      assetTypeId: asset.assetTypeId ?? 1,
      couponRate: asset.couponRate ?? 0,
      maturityDate: asset.maturityDate ?? '',
      faceValue: asset.faceValue ?? 0,
      dividendYield: asset.dividendYield ?? 0,
      accumulation: asset.accumulation ?? false,
      totalQuantity: 0,
      averagePurchasePrice: 0,
      totalInvested: 0,
      currentValue: asset.currentValue ?? 0,
      unrealizedGainLoss: 0,
      createdAt: asset.createdAt ?? '',
      updatedAt: '',
    });
  }
}
