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
  @Input() defaultOption: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = '';
  @Input() control?: FormControl;
  @Input() backgroundStyleColor: string = '';
  @Input() disabled: boolean = false;

  @Output() onChange = new EventEmitter<T>();

  private elementRef = inject(ElementRef);

  isOpen: boolean = false;
  selected: T | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      this.selected = this.control.value;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: T): void {
    this.selected = option;
    this.isOpen = false;
    this.control?.setValue(option);
    this.onChange.emit(option);
  }
}
