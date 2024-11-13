import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Portfolio,
  PortfolioFormControls,
  PortfolioSnakeCase,
} from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class InvestmentPortfolioModalPortfolioService {
  private formBuilder = inject(FormBuilder);

  createPortfolioForm(portfolio?: PortfolioSnakeCase | null): FormGroup<PortfolioFormControls> {
    return this.formBuilder.group({
      name: portfolio?.name ?? '',
      description: portfolio?.description ?? '',
    });
  }
}
