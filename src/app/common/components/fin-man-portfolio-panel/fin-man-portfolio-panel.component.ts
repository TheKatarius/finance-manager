// src/app/fin-man-portfolio-panel/fin-man-portfolio-panel.component.ts

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PortfolioService } from '@app/core/data/portfolios.service';
import { Portfolio, PortfolioSnakeCase } from '@app/core/interfaces/asset.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import { ReloadPageService } from '@app/core/services/dashboard.service';
import { NotificationService } from '@app/core/services/notifications.service';

@Component({
  selector: 'fin-man-portfolio-panel',
  templateUrl: './fin-man-portfolio-panel.component.html',
  styleUrls: ['./fin-man-portfolio-panel.scss'],
})
export class FinManPortfolioPanelComponent {
  @Input() portfolios: Portfolio[] = [];

  @Output() openPortfolioModal = new EventEmitter<PortfolioSnakeCase>();

  readonly CrudOperations = CrudOperations;

  private portfolioService = inject(PortfolioService);
  private notificationService = inject(NotificationService);
  private reloadPageService = inject(ReloadPageService);

  portofoliosSnakeCase: PortfolioSnakeCase[] = [];

  ngOnInit(): void {
    this.portofoliosSnakeCase = this.portfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      created_at: (portfolio as any)?.created_at,
      updated_at: (portfolio as any)?.updated_at,
    }));
  }

  handleOptionSelected(option: CrudOperations, portfolio: PortfolioSnakeCase): void {
    switch (option) {
      case CrudOperations.EDIT:
        this.editPortfolio(portfolio);
        break;
      case CrudOperations.DELETE:
        this.deletePortfolio(portfolio);
        break;
      default:
        break;
    }
  }

  editPortfolio(portfolio: PortfolioSnakeCase): void {
    this.openPortfolioModal.emit(portfolio);
  }

  deletePortfolio(portfolio: PortfolioSnakeCase): void {
    this.portfolioService.deletePortfolio(portfolio.id).subscribe({
      next: () => {
        this.notificationService.addNotification({
          type: 'success',
          message: 'Portfolio deleted successfully',
        });
        this.reloadPageService.reloadPage('/investment-portfolio');
      },
      error: () => {
        this.notificationService.addNotification({
          type: 'error',
          message: 'Failed to delete portfolio',
        });
      },
    });
  }
}
