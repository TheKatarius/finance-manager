import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
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

  readonly CategoryKind = CategoryKind;

  private formBuilder = inject(FormBuilder);

  categories: (ExpenseCategoryNames | IncomeCategoryNames)[] = IncomeSourcesMockData.map(
    (category) => category.category,
  );

  budgetFormGroup!: FormGroup<{
    category: FormControl<string | null>;
    amount: FormControl<number | null>;
  }>;

  ngOnInit(): void {
    this.budgetFormGroup = this.formBuilder.group({
      category: ['', Validators.required],
      amount: 0,
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.budgetFormGroup.valid) {
      const budgetData = this.budgetFormGroup.value;
      this.budgetAdded.emit(budgetData);
      this.budgetFormGroup.reset();
      this.closeModal();
    }
  }

  changeCategoryKind(categoryKind: CategoryKind): void {
    if (categoryKind === CategoryKind.Expense) {
      this.categories = ExpenseCategoriesMockData.map((category) => category.category);
    } else {
      this.categories = IncomeSourcesMockData.map((category) => category.category);
    }
    this.budgetFormGroup.controls.category.reset();
  }
}
