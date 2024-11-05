import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Portfolio, PortfolioFormControls } from '@app/core/interfaces/asset.schema';

@Injectable({
  providedIn: 'root',
})
export class InvestmentPortfolioModalPortfolioService {
  private formBuilder = inject(FormBuilder);

  createPortfolioForm(portfolio?: Portfolio): FormGroup<PortfolioFormControls> {
    return this.formBuilder.group({
      name: [portfolio?.name ?? '', Validators.required],
      description: [portfolio?.description ?? ''],
    });
  }
}
