import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'finance-manager-menu-subsection',
  templateUrl: './menu-subsection.component.html',
  styleUrls: ['../../../../css/components/menu/menu-section/menu-subsection/menu-subsection.scss'],
})
export class MenuSubsectionComponent {
  @Input() sectionClassName!: string;
  @Input() subsectionName!: string;

  // Remove unwanted lines at the last subsection
  @Input() lastSubsection: boolean = false;

  // If subsection below is hovered over or clicked, then highlight main line
  @Input() highlightMainLine: boolean = false;

  // Using boolean instead of long condition
  @Input() isSubsectionActive: boolean = false;

  @Input() subsectionNameHovered: string = '';
  @Input() subsectionNameClicked: string = '';

  @Output() subsectionHovered = new EventEmitter<string>();
  @Output() subsectionClicked = new EventEmitter<string>();

  isSubsectionHovered: boolean = false;

  onSubsectionMouseEnter(subsectionName: string): void {
    this.isSubsectionHovered = true;
    this.subsectionHovered.emit(subsectionName);
  }

  onSubsectionMouseLeave(): void {
    this.isSubsectionHovered = false;
    this.subsectionHovered.emit('');
  }

  onSubsectionClick(subsectionName: string): void {
    this.subsectionClicked.emit(subsectionName);
  }
}
