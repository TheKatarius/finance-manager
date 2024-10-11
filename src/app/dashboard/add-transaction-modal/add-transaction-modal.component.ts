import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { ExtendedTransactionFormControls } from '@app/core/interfaces/transaction.schema';
import { ExpenseCategoriesMockData, IncomeSourcesMockData } from '@app/core/mocks/pie-charts.mocks';

@Component({
  selector: 'finance-manager-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['../../../css/components/dashboard/add-transaction-modal/add-transaction-modal.scss'],
})
export class AddTransactionModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() transactionAdded = new EventEmitter<any>();

  readonly VALIDATION = VALIDATION;

  readonly CategoryKind = CategoryKind;

  private formBuilder = inject(FormBuilder);

  categories: (ExpenseCategoryNames | IncomeCategoryNames)[] = ExpenseCategoriesMockData.map(
    (category) => category.category,
  );

  extendedTransactionFormGroup!: FormGroup<ExtendedTransactionFormControls>;

  ngOnInit(): void {
    this.extendedTransactionFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      time: [new Date().toLocaleTimeString(), Validators.required],
      currencyIsoCode: ['PLN', Validators.required],
      currencyFullName: 'Polski złoty',
      description: '',
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.extendedTransactionFormGroup.valid) {
      const transactionData = this.extendedTransactionFormGroup.value;
      this.transactionAdded.emit(transactionData);
      this.extendedTransactionFormGroup.reset();
      this.closeModal();
    }
  }

  changeCategoryKind(categoryKind: string): void {
    if (categoryKind === CategoryKind.Expense) {
      this.categories = ExpenseCategoriesMockData.map((category) => category.category);
    } else {
      this.categories = IncomeSourcesMockData.map((category) => category.category);
    }
    this.extendedTransactionFormGroup.controls.category.reset();
  }
}
