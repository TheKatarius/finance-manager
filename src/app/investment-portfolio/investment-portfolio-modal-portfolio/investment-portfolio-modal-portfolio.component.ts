import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import { PortfolioService } from '@app/core/data/portfolios.service';
import {
  Portfolio,
  PortfolioFormControls,
  PortfolioSnakeCase,
  PortfolioUpdateRequest,
} from '@app/core/interfaces/asset.schema';
import { ReloadPageService } from '@app/core/services/dashboard.service';
import { NotificationService } from '@app/core/services/notifications.service';
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
  @Input() selectedPortfolio: PortfolioSnakeCase | null = null;

  @Output() close: EventEmitter<void> = new EventEmitter();

  readonly VALIDATION = VALIDATION;

  portfolioForm!: FormGroup<PortfolioFormControls>;

  constructor(
    private formGroupService: InvestmentPortfolioModalPortfolioService,
    private portfolioService: PortfolioService,
    private reloadPageService: ReloadPageService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.portfolioForm = this.formGroupService.createPortfolioForm(this.selectedPortfolio);
  }

  onSubmit(): void {
    if (this.portfolioForm.invalid) {
      return;
    }

    const formValues = this.portfolioForm.value;

    if (!this.selectedPortfolio) {
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
          this.reloadPageService.reloadPage('/investment-portfolio');
        },
        error: (err) => {
          console.error(err);
          this.notificationService.addNotification({
            type: 'error',
            message: err.error?.message || 'Failed to add portfolio',
          });
        },
      });
    } else {
      // Aktualizacja istniejącego portfela
      const updatedPortfolio: PortfolioUpdateRequest = {
        name: formValues.name!,
        description: formValues.description ?? '',
      };

      this.portfolioService.updatePortfolio(this.selectedPortfolio.id, updatedPortfolio).subscribe({
        next: (portfolio) => {
          this.notificationService.addNotification({
            type: 'success',
            message: 'Portfolio updated successfully',
          });
          this.closeModal();
          this.reloadPageService.reloadPage('/investment-portfolio');
        },
        error: (err) => {
          console.error(err);
          this.notificationService.addNotification({
            type: 'error',
            message: err.error?.message || 'Failed to update portfolio',
          });
        },
      });
    }
  }

  closeModal(): void {
    this.close.emit();
    this.portfolioForm.reset();
  }
}
