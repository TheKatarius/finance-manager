import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fin-man-custom-dropdown',
  templateUrl: './fin-man-custom-dropdown.component.html',
  styleUrls: ['./fin-man-custom-dropdown.scss'],
})
export class FinManCustomDropdownComponent<T> implements OnChanges {
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
  @Output() onChangeMulti = new EventEmitter<T[]>();

  private elementRef = inject(ElementRef);

  isOpen: boolean = false;
  selected: T | null = null;
  selectedOptions: T[] = [];

  ngOnInit(): void {
    this.defaultOption = this.defaultOption === null ? '' : this.defaultOption;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      if (this.isMultiSelect) {
        this.selectedOptions = this.control.value || [];
      } else {
        this.selected = this.control.value;
      }
    }
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

  selectOption(option: T): void {
    this.selected = option;
    this.isOpen = false;
    this.control?.setValue(option);
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
