import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  ExpenseCategoryNames,
  IncomeCategoryNames,
} from '@app/core/interfaces/category-names.schema';
import { ExpenseCategoriesMockData, IncomeSourcesMockData } from '@app/core/mocks/pie-charts.mocks';
import { ExtendedTransactionFormControls } from '@app/core/interfaces/transaction.schema';
import { VALIDATION } from '@app/core/constants/validators.const';

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

  private formBuilder = inject(FormBuilder);

  categories: (ExpenseCategoryNames | IncomeCategoryNames)[] = IncomeSourcesMockData.map(
    (category) => category.category,
  );

  extendedTransactionForm!: FormGroup<ExtendedTransactionFormControls>;

  ngOnInit(): void {
    this.extendedTransactionForm = this.formBuilder.group({
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
    if (this.extendedTransactionForm.valid) {
      const transactionData = this.extendedTransactionForm.value;
      this.transactionAdded.emit(transactionData);
      this.extendedTransactionForm.reset();
      this.closeModal();
    }
  }

  selectedExpenseCategoryChange(event: Event): void {
    if ((event.target as HTMLSelectElement).value === 'Expense') {
      this.categories = ExpenseCategoriesMockData.map((category) => category.category);
    } else {
      this.categories = IncomeSourcesMockData.map((category) => category.category);
    }
    this.extendedTransactionForm.controls.category.setValue('');
  }
}
