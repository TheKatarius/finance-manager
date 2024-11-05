import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Asset, AssetFormControls } from '@app/core/interfaces/asset.schema';

@Injectable()
export class InvestmentPortfolioFormGroupService {
  private formBuilder = inject(FormBuilder);

  createInvestmentPortfolioAsset(asset?: Asset): FormGroup<AssetFormControls> {
    return this.formBuilder.group({
      // Podstawowe informacje
      portfolioId: asset?.portfolioId ?? '',
      name: asset?.name ?? '',
      ticker: asset?.ticker ?? '',
      assetTypeId: asset?.assetTypeId ?? 1,

      // Finansowe szczegóły
      couponRate: asset?.couponRate ?? 0,
      maturityDate: asset?.maturityDate ? this.formatDate(asset.maturityDate) : '',

      faceValue: asset?.faceValue ?? 0,
      dividendYield: asset?.dividendYield ?? 0,
      accumulation: asset?.accumulation ?? false,

      // Ilościowe szczegóły (domyślnie wyłączone, ponieważ są kalkulowane)
      totalQuantity: { value: asset?.totalQuantity ?? 0, disabled: true },
      averagePurchasePrice: { value: asset?.averagePurchasePrice ?? 0, disabled: true },

      totalInvested: { value: asset?.totalInvested ?? 0, disabled: true },
      currentValue: asset?.currentValue ?? 0,
      unrealizedGainLoss: { value: asset?.unrealizedGainLoss ?? 0, disabled: true },

      // Walutowe i giełdowe szczegóły
      currency: asset?.currency ?? '',
      exchange: asset?.exchange ?? '',

      // Dodatkowe szczegóły (domyślnie wyłączone)
      interestAccrued: { value: asset?.interestAccrued ?? 0, disabled: true },

      createdAt: asset?.createdAt ? this.formatDate(asset.createdAt) : '',
      updatedAt: {
        value: asset?.updatedAt ? this.formatDate(asset.updatedAt) : '',
        disabled: true,
      },
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
