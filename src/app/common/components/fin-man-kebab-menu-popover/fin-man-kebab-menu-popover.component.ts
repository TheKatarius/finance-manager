import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CrudOperations } from '@app/core/interfaces/crud-operations-enum.schema';

@Component({
  selector: 'fin-man-kebab-menu-popover',
  templateUrl: './fin-man-kebab-menu-popover.component.html',
  styleUrls: ['./fin-man-kebab-menu-popover.scss'],
})
export class FinManKebabMenuPopoverComponent {
  @Input() options: CrudOperations[] = [];

  @Output() onChange = new EventEmitter<CrudOperations>();

  private elementRef = inject(ElementRef);

  isOpen: boolean = false;
  selected: string | null = null;

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleKebabMenu(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: CrudOperations): void {
    this.isOpen = false;
    this.selected = option;
    this.onChange.emit(option);
  }
}
