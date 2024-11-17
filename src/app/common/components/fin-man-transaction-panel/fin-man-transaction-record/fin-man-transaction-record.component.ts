import { Component, inject, Input } from '@angular/core';
import { PersonalEnumsService } from '@app/core/data/personal-enums.service';

import { CategoryKind } from '@app/core/interfaces/common-enums.schema';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';
import {
  Category,
  PaymentMethod,
  PersonalTransaction,
} from '@app/core/interfaces/personal-transactions.schema';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'fin-man-transaction-record',
  templateUrl: './fin-man-transaction-record.component.html',
  styleUrls: ['./fin-man-transaction-record.scss'],
})
export class FinManTransactionRecordComponent {
  @Input() transactions!: PersonalTransaction[];
  @Input() extendedRecord: boolean = false;
  @Input() categoryKind: CategoryKind = CategoryKind.Expense;
  @Input() categoryNames: string[] = [];

  private personalEnumsService = inject(PersonalEnumsService);

  readonly CrudOperations = CrudOperations;

  categories: Category[] = [];
  paymentMethods: PaymentMethod[] = [];

  ngOnInit(): void {
    forkJoin([
      this.personalEnumsService.getPredefinedCategories(),
      this.personalEnumsService.getPredefinedPaymentMethods(),
    ]).subscribe({
      next: ([categories, paymentMethods]) => {
        this.categories = categories.categories;
        this.paymentMethods = paymentMethods.methods;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCategoryName(transaction: PersonalTransaction): string {
    return (
      this.categories.find((category) => category.id === transaction.predefined_category_id)
        ?.name ?? ''
    );
  }

  getPaymentMethodName(transaction: PersonalTransaction): string {
    return (
      this.paymentMethods.find((method) => method.id === transaction.payment_method_id)?.name ?? ''
    );
  }
}
