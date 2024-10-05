import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import { ExpenseCategoriesMockData, IncomeSourcesMockData } from '@app/core/mocks/pie-charts.mocks';

@Component({
  selector: 'finance-manager-plan-budget-category-modal',
  templateUrl: './plan-budget-category-modal.component.html',
  styleUrls: [
    '../../../../css/components/personal-finance/budgeting/plan-budget-category-modal/plan-budget-category-modal.scss',
  ],
})
export class PlanBudgetCategoryModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() budgetAdded = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);

  categories: (ExpenseCategoryNames | IncomeCategoryNames)[] = IncomeSourcesMockData.map(
    (category) => category.category,
  );

  budgetForm!: FormGroup<{
    category: FormControl<string | null>;
    amount: FormControl<number | null>;
  }>;

  ngOnInit(): void {
    this.budgetForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: 0,
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budgetData = this.budgetForm.value;
      this.budgetAdded.emit(budgetData);
      this.budgetForm.reset();
      this.closeModal();
    }
  }

  selectedExpenseCategoryChange(event: Event): void {
    if ((event.target as HTMLSelectElement).value === 'Expense') {
      this.categories = ExpenseCategoriesMockData.map((category) => category.category);
    } else {
      this.categories = IncomeSourcesMockData.map((category) => category.category);
    }
    this.budgetForm.controls.category.setValue('');
  }
}
