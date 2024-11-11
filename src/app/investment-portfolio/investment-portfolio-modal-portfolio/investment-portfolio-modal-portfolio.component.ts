import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { PortfolioService } from '@app/core/data/portfolios.service';
import { Portfolio, PortfolioFormControls } from '@app/core/interfaces/asset.schema';
import { InvestmentPortfolioModalPortfolioService } from '@app/investment-portfolio/investment-portfolio-modal-portfolio/investment-portfolio-modal-portfolio.service';
import { InvestmentPortfolioService } from '../investment-portfolio.service';
import { NotificationService } from '@app/core/services/notifications.service';

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

  readonly VALIDATION = VALIDATION;

  portfolioForm: FormGroup<PortfolioFormControls>;

  constructor(
    private formGroupService: InvestmentPortfolioModalPortfolioService,
    private portfolioService: PortfolioService,
    private investmentPortfolioService: InvestmentPortfolioService,
    private notificationService: NotificationService,
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

    this.portfolioService.createPortfolio(newPortfolio).subscribe({
      next: (portfolio) => {
        this.notificationService.addNotification({
          type: 'success',
          message: 'Portfolio created successfully',
        });
        this.closeModal();
        this.investmentPortfolioService.reloadInvestmentPortfolioPage();
      },
      error: (err) => {
        console.error(err);
        this.notificationService.addNotification({
          type: 'error',
          message: err.error?.message || 'Failed to add portfolio',
        });
      },
    });
  }

  closeModal(): void {
    this.close.emit();
    this.portfolioForm.reset();
  }
}
