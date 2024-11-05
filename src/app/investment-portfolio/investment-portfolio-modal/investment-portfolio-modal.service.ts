import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Asset, AssetFormControls, AssetTypes } from '@app/core/interfaces/asset.schema';

@Injectable()
export class InvestmentPortfolioFormGroupService {
  private formBuilder = inject(FormBuilder);

  createInvestmentPortfolioAsset(asset?: Asset): FormGroup<AssetFormControls> {
    return this.formBuilder.group({
      // Podstawowe informacje
      portfolioId: [asset?.portfolioId ?? '', Validators.required],
      name: [asset?.name ?? '', Validators.required],
      ticker: [asset?.ticker ?? '', Validators.required],
      assetTypeId: [asset?.assetTypeId ?? AssetTypes.Stock, Validators.required],

      // Finansowe szczegóły
      couponRate: [asset?.couponRate ?? 0, [Validators.required, Validators.min(0)]],
      maturityDate: [
        asset?.maturityDate ? this.formatDate(asset.maturityDate) : '',
        Validators.required,
      ],
      faceValue: [asset?.faceValue ?? 0, [Validators.required, Validators.min(0)]],
      dividendYield: [asset?.dividendYield ?? 0, [Validators.required, Validators.min(0)]],
      accumulation: [asset?.accumulation ?? false, Validators.required],

      // Ilościowe szczegóły (domyślnie wyłączone, ponieważ są kalkulowane)
      totalQuantity: [{ value: asset?.totalQuantity ?? 0, disabled: true }, Validators.required],
      averagePurchasePrice: [
        { value: asset?.averagePurchasePrice ?? 0, disabled: true },
        Validators.required,
      ],
      totalInvested: [{ value: asset?.totalInvested ?? 0, disabled: true }, Validators.required],
      currentValue: [{ value: asset?.currentValue ?? 0, disabled: true }, Validators.required],
      unrealizedGainLoss: [
        { value: asset?.unrealizedGainLoss ?? 0, disabled: true },
        Validators.required,
      ],

      // Walutowe i giełdowe szczegóły
      currency: [asset?.currency ?? '', Validators.required],
      exchange: [asset?.exchange ?? '', Validators.required],

      // Dodatkowe szczegóły (domyślnie wyłączone)
      interestAccrued: [
        { value: asset?.interestAccrued ?? 0, disabled: true },
        Validators.required,
      ],
      createdAt: [
        { value: asset?.createdAt ? this.formatDate(asset.createdAt) : '', disabled: true },
        Validators.required,
      ],
      updatedAt: [
        { value: asset?.updatedAt ? this.formatDate(asset.updatedAt) : '', disabled: true },
        Validators.required,
      ],
    });
  }

  /**
   * Formatuje obiekt Date do formatu YYYY-MM-DD, kompatybilnego z HTML5 input type="date"
   * @param date Obiekt Date
   * @returns Sformatowana data jako string
   */
  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
