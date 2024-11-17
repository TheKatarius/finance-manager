import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';
import { CurrenciesMocks } from '@app/core/constants/currencies.const';
import { VALIDATION } from '@app/core/constants/validators.const';
import { PersonalTransactionsService } from '@app/core/data/personal-transactions.service';
import { CodeValueItem } from '@app/core/interfaces/code-value.schema';
import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import {
  Category,
  PaymentMethod,
  PersonalTransactionFormControls,
} from '@app/core/interfaces/personal-transactions.schema';
import { MergeCodeNamePipe } from '@app/core/pipes/merge-code-name.pipe';
import { ReloadPageService } from '@app/core/services/dashboard.service';
import { NotificationService } from '@app/core/services/notifications.service';
import { validateFormGroup } from '@app/core/validators/validate-form-group.utils';
import { CommonModule } from '@common/common.module';

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
  @Input() expenseCategories: Category[] = [];
  @Input() incomeCategories: Category[] = [];
  @Input() paymentMethods: PaymentMethod[] = [];
  @Input() path: string = '';

  @Output() close = new EventEmitter<void>();

  readonly VALIDATION = VALIDATION;
  readonly CategoryKind = CategoryKind;

  private formBuilder = inject(FormBuilder);
  private mergeCodeNamePipe = inject(MergeCodeNamePipe);
  private personalTransactionsService = inject(PersonalTransactionsService);
  private notificationService = inject(NotificationService);
  private reloadPageService = inject(ReloadPageService);

  currencies: string[] = CurrenciesMocks.map((currency) =>
    this.mergeCodeNamePipe.transform(currency),
  );
  defaultCurrency = this.mergeCodeNamePipe.transform(
    CurrenciesMocks.find((currency) => currency.code === 'PLN') as CodeValueItem,
  );

  paymentMethodsIds: number[] = [];
  paymentMethodsNames: string[] = [];

  categoryIds: number[] = [];
  categoryNames: string[] = [];

  extendedTransactionFormGroup!: FormGroup<PersonalTransactionFormControls>;

  ngOnInit(): void {
    this.paymentMethodsIds = this.paymentMethods.map((method) => method.id);
    this.paymentMethodsNames = this.paymentMethods.map((method) => method.name);

    this.categoryNames = this.expenseCategories.map((category) => category.name);

    this.extendedTransactionFormGroup = this.formBuilder.group({
      name: new FormControl<string>('', { nonNullable: true }),
      type: new FormControl<'income' | 'expense'>('expense', { nonNullable: true }),
      date: new FormControl<string>(new Date().toISOString().split('T')[0], { nonNullable: true }),
      amount: new FormControl<number>(0, { nonNullable: true }),
      payment_method_id: new FormControl<number>(1, { nonNullable: true }),
      payment_source_id: new FormControl<number>(1),
      predefined_category_id: new FormControl<number>(1, { nonNullable: true }),
      description: new FormControl<string>(''),
    });

    this.changeCategoryKind(CategoryKind.Expense);
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (validateFormGroup(this.extendedTransactionFormGroup)) {
      const transactionData = this.extendedTransactionFormGroup.value;

      // TODO: Do podmiany na request z backendu
      const request = {
        amount: Number(transactionData.amount),
        type: transactionData.type,
        date: new Date(),
        description: transactionData.name,
        predefined_category_id: transactionData.predefined_category_id,
        payment_method_id: transactionData.payment_method_id,
      };

      this.handleTransactionAdded(request);
      this.extendedTransactionFormGroup.reset();
      this.closeModal();
    }
  }

  handleTransactionAdded(personalTransaction: any): void {
    this.personalTransactionsService.createUserTransaction(personalTransaction).subscribe({
      next: () => {
        this.notificationService.addNotification({
          type: 'success',
          message: 'Transaction added successfully',
        });

        this.reloadPageService.reloadPage(this.path);
      },
      error: () => {
        this.notificationService.addNotification({
          type: 'error',
          message: 'Failed to add transaction',
        });
      },
    });
  }

  changeCategoryKind(categoryKind: CategoryKind): void {
    if (categoryKind === CategoryKind.Expense) {
      this.categoryIds = this.expenseCategories.map((category) => category.id);
      this.categoryNames = this.expenseCategories.map((category) => category.name);
    } else {
      this.categoryIds = this.incomeCategories.map((category) => category.id);
      this.categoryNames = this.incomeCategories.map((category) => category.name);
    }
    this.extendedTransactionFormGroup.controls.predefined_category_id.reset();
  }
}
