import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Asset, AssetFormControls } from '@app/core/interfaces/asset.schema';

@Injectable()
export class InvestmentPortfolioFormGroupService {
  private formBuilder = inject(FormBuilder);

  createInvestmentPortfolioAsset(asset?: Asset): FormGroup<AssetFormControls> {
    return this.formBuilder.group({
      // Podstawowe informacje
      PortfolioID: asset?.PortfolioID ?? '',
      Name: asset?.Name ?? '',
      Ticker: asset?.Ticker ?? '',
      AssetTypeID: asset?.AssetTypeID ?? 1,

      // Finansowe szczegóły
      CouponRate: asset?.CouponRate ?? 0,
      MaturityDate: asset?.MaturityDate ? this.formatDate(asset.MaturityDate) : '',

      FaceValue: asset?.FaceValue ?? 0,
      DividendYield: asset?.DividendYield ?? 0,
      Accumulation: asset?.Accumulation ?? false,

      // Ilościowe szczegóły (domyślnie wyłączone, ponieważ są kalkulowane)
      TotalQuantity: { value: asset?.TotalQuantity ?? 0, disabled: true },
      AveragePurchasePrice: { value: asset?.AveragePurchasePrice ?? 0, disabled: true },

      TotalInvested: { value: asset?.TotalInvested ?? 0, disabled: true },
      CurrentValue: asset?.CurrentValue ?? 0,
      UnrealizedGainLoss: { value: asset?.UnrealizedGainLoss ?? 0, disabled: true },

      // Walutowe i giełdowe szczegóły
      Currency: asset?.Currency ?? '',
      Exchange: asset?.Exchange ?? '',
      ExchangeShort: asset?.ExchangeShort ?? '',

      // Dodatkowe szczegóły (domyślnie wyłączone)
      InterestAccrued: { value: asset?.InterestAccrued ?? 0, disabled: true },

      CreatedAt: asset?.CreatedAt
        ? this.formatDate(asset.CreatedAt)
        : new Date().toISOString().split('T')[0],
      UpdatedAt: {
        value: asset?.UpdatedAt ? this.formatDate(asset.UpdatedAt) : '',
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
