import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { menuSubsectionClassNames } from '@app/menu/menu.utils';
import { GetStringService } from '@app/core/services/get-string.service';

@Component({
  selector: 'finance-manager-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrl: '../../../css/components/menu/menu-section/menu-section.scss',
})
export class MenuSectionComponent {
  // Current section
  @Input() menuSectionClassName!: string;

  // Monitor if and which section is clicked
  @Input() isActive: boolean = false;
  @Output() sectionClicked = new EventEmitter<string>();

  private getStringService = inject(GetStringService);

  // Get all subsectionNames in className format
  subsectionClassNames: string[] = menuSubsectionClassNames(
    (...code: string[]) => this.getStringService.get(...code)
  );

  // All sections that are expandable in className format
  expandableClassNames: string[] = [
    this.getStringService.get('personalFinance', 'lowerCaseTitle'),
  ];

  // If sections was hovered over
  isHovered: boolean = false;
  subsectionNameHovered: string = '';

  subsectionNameClicked: string = '';

  // Highlight lines above clicked subsection
  highlightAboveSubsectionsClicked: number[] = [];

  // Highlight lines above hovered over subsection
  highlightAboveSubsections: number[] = [];

  isExpandable(): boolean {
    return this.expandableClassNames.includes(this.menuSectionClassName);
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  onClick(sectionName: string): void {
    this.sectionClicked.emit(sectionName);

    // Undo highlighting lines
    this.subsectionNameClicked = '';
    this.highlightAboveSubsectionsClicked = [];
  }

  onSubsectionClick(subsectionName: string): void {
    this.subsectionNameClicked = subsectionName;
    this.highlightAboveSubsectionsClicked =
      this.getIndexesAbove(subsectionName);
  }

  onSubsectionHover(subsectionName: string): void {
    this.subsectionNameHovered = subsectionName;
    this.highlightAboveSubsections = this.getIndexesAbove(subsectionName);
  }

  getIndexesAbove(subsectionName: string): number[] {
    const index = this.subsectionClassNames.findIndex(
      (subsection) => subsection === subsectionName
    );
    return Array.from({ length: index }, (_, i) => i);
  }
}
