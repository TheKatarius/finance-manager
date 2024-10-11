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
export class FinManCustomDropdownComponent implements OnChanges {
  @Input() options: string[] = [];
  @Input() defaultOption: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = '';
  @Input() control?: FormControl;

  @Output() onChange = new EventEmitter<string>();

  private elementRef = inject(ElementRef);

  isOpen: boolean = false;
  selected: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', this.control);

    if (this.control?.value) {
      console.log('if');
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

  selectOption(option: string): void {
    this.selected = option;
    this.isOpen = false;
    this.control?.setValue(option);
    console.log(this.control);
    this.onChange.emit(option);
  }
}
