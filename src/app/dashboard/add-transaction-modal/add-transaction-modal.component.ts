import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { VALIDATION } from '@app/core/constants/validators.const';
import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import { CodeValueItem } from '@app/core/interfaces/code-value.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import {
  ExtendedTransactionFormControls,
  PaymentSource,
} from '@app/core/interfaces/transaction.schema';
import { CurrenciesMocks } from '@app/core/constants/currencies.const';
import { PaymentTypes } from '@app/core/mocks/payment-types.mocks';
import { ExpenseCategoriesMockData, IncomeSourcesMockData } from '@app/core/mocks/pie-charts.mocks';
import { MergeCodeNamePipe } from '@app/core/pipes/merge-code-name.pipe';
import { CommonModule } from '@common/common.module';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  selector: 'finance-manager-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['../../../css/components/dashboard/add-transaction-modal/add-transaction-modal.scss'],
  providers: [MergeCodeNamePipe],
})
export class AddTransactionModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() transactionAdded = new EventEmitter<any>();

  readonly VALIDATION = VALIDATION;

  readonly CategoryKind = CategoryKind;

  private formBuilder = inject(FormBuilder);

  private mergeCodeNamePipe = inject(MergeCodeNamePipe);

  categories: (ExpenseCategoryNames | IncomeCategoryNames)[] = ExpenseCategoriesMockData.map(
    (category) => category.category,
  );

  currencies: string[] = CurrenciesMocks.map((currency) =>
    this.mergeCodeNamePipe.transform(currency),
  );

  defaultCurrency = this.mergeCodeNamePipe.transform(
    CurrenciesMocks.find((currency) => currency.code === 'PLN') as CodeValueItem,
  );

  paymentSources: string[] = Object.values(PaymentSource);

  extendedTransactionFormGroup!: FormGroup<ExtendedTransactionFormControls>;

  ngOnInit(): void {
    this.extendedTransactionFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      time: [new Date().toLocaleTimeString(), Validators.required],
      paymentType: ['', Validators.required],
      currencyIsoCode: ['', Validators.required],
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

  changeCategoryKind(categoryKind: CategoryKind): void {
    if (categoryKind === CategoryKind.Expense) {
      this.categories = ExpenseCategoriesMockData.map((category) => category.category);
    } else {
      this.categories = IncomeSourcesMockData.map((category) => category.category);
    }
    this.extendedTransactionFormGroup.controls.category.reset();
  }
}
