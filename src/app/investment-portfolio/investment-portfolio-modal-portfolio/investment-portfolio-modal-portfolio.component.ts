import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { PortfolioService } from '@app/core/data/portfolios.service';
import { Portfolio, PortfolioFormControls } from '@app/core/interfaces/asset.schema';
import { InvestmentPortfolioModalPortfolioService } from '@app/investment-portfolio/investment-portfolio-modal-portfolio/investment-portfolio-modal-portfolio.service';

@Component({
  selector: 'finance-manager-investment-portfolio-modal-portfolio',
  templateUrl: './investment-portfolio-modal-portfolio.component.html',
  styleUrls: [
    '../../../css/components/investment-portfolio/investment-portfolio-modal-portfolio/investment-portfolio-modal-portfolio.scss',
  ],
})
export class InvestmentPortfolioModalPortfolioComponent implements OnInit {
  @Input() isVisible: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() portfolioAdded: EventEmitter<Portfolio> = new EventEmitter();

  portfolioForm: FormGroup<PortfolioFormControls>;

  constructor(
    private formGroupService: InvestmentPortfolioModalPortfolioService,
    private portfolioService: PortfolioService,
  ) {
    this.portfolioForm = this.formGroupService.createPortfolioForm();
  }

  ngOnInit(): void {
    this.portfolioForm = this.formGroupService.createPortfolioForm();
  }

  onSubmit(): void {
    if (this.portfolioForm.invalid) {
      return;
    }

    const formValues = this.portfolioForm.value;

    // Tworzenie nowego portfela
    const newPortfolio: Portfolio = {
      id: '', // Będzie nadpisane przez serwis
      name: formValues.name!,
      description: formValues.description ?? '',
      createdAt: new Date(), // Będzie nadpisane przez serwis
      updatedAt: new Date(), // Będzie nadpisane przez serwis
    };

    this.portfolioService.createPortfolio(newPortfolio).subscribe(
      (portfolio) => {
        this.portfolioAdded.emit(portfolio);
        this.closeModal();
      },
      (err) => {
        console.error(err);
      },
    );
  }

  closeModal(): void {
    this.close.emit();
    this.portfolioForm.reset();
  }

  protected readonly VALIDATION = VALIDATION;
}
