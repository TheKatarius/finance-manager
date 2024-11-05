import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CustomDropdownService } from '@common/components/fin-man-custom-dropdown/fin-man-custom-dropdown.service';

@Component({
  selector: 'fin-man-custom-dropdown',
  templateUrl: './fin-man-custom-dropdown.component.html',
  styleUrls: ['./fin-man-custom-dropdown.scss'],
})
export class FinManCustomDropdownComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() optionsIds: number[] = [];
  @Input() optionStringIds: string[] = [];
  @Input() options: T[] = [];
  @Input() defaultOption: string | null = '';
  @Input() defaultOptionNumber: number | null = null;
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = '';
  @Input() control?: FormControl;
  @Input() backgroundStyleColor: string = '';
  @Input() disabled: boolean = false;
  @Input() isMultiSelect: boolean = false;

  @Output() onChangeSingle = new EventEmitter<T>();
  @Output() onChangeNumber = new EventEmitter<number>();
  @Output() onChangeMulti = new EventEmitter<T[]>();

  private elementRef = inject(ElementRef);
  private customDropdownService = inject(CustomDropdownService);
  private clearSelectionsSubscription!: Subscription;

  isOpen: boolean = false;
  selectedId: number = 0;
  selectedStringId: string = '';
  selected: T | null = null;
  selectedOptions: T[] = [];

  ngOnInit(): void {
    this.defaultOption = this.defaultOption === null ? '' : this.defaultOption;

    if (this.isMultiSelect) {
      this.clearSelectedCheckboxes();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control && (changes.optionsIds || changes.optionStringIds)) {
      this.selectedId = this.control.value;
    } else if (this.control && !changes.optionsIds && !changes.optionStringIds) {
      if (this.isMultiSelect) {
        this.selectedOptions = this.control.value || [];
      } else {
        this.selected = this.control.value;
      }
    }
  }

  ngOnDestroy(): void {
    this.clearSelectionsSubscription?.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  clearSelectedCheckboxes(): void {
    this.clearSelectionsSubscription = this.customDropdownService.clearSelected$.subscribe(() => {
      this.selectedOptions = [];
      this.control?.setValue(this.selectedOptions);
      this.onChangeMulti.emit(this.selectedOptions);
    });
  }

  getDisplayValue(option: T): T | null {
    return this.options[this.selectedId - 1] || this.selected;
  }

  selectOption(option: T): void {
    this.selected = option;
    if (this.optionsIds.length) {
      this.selectedId = this.optionsIds[this.options.indexOf(option)];
    } else if (this.optionStringIds.length) {
      this.selectedStringId = this.optionStringIds[this.options.indexOf(option)];
    }

    if (this.optionsIds.length) {
      const id = this.options.findIndex((opt) => opt === option);
      this.control?.setValue(this.optionsIds[id]);
      this.onChangeNumber.emit(this.optionsIds[id]);
    } else if (this.optionStringIds.length) {
      const id = this.options.findIndex((opt) => opt === option);
      this.control?.setValue(this.optionStringIds[id]);
    } else {
      this.control?.setValue(option);
    }

    this.isOpen = false;
    this.onChangeSingle.emit(option);
  }

  selectOptionMulti(option: T): void {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }

    this.control?.setValue(this.selectedOptions);
    this.onChangeMulti.emit(this.selectedOptions);
  }
}
