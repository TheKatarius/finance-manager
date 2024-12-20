import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

import { GetStringService } from '@app/core/services/get-string.service';
import { MenuService } from '@app/menu/menu.service';
import { menuSubsectionClassNames } from '@app/menu/menu.utils';

@Component({
  selector: 'finance-manager-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['../../../css/components/menu/menu-section/menu-section.scss'],
})
export class MenuSectionComponent implements OnInit {
  // Current section
  @Input() menuSectionClassName!: string;

  // Monitor if and which section is clicked
  @Input() isActive: boolean = false;
  @Output() sectionClicked = new EventEmitter<string>();

  private getStringService = inject(GetStringService);

  private menuService = inject(MenuService);

  // Get all subsectionNames in className format
  subsectionClassNames: string[] = menuSubsectionClassNames((...code: string[]) =>
    this.getStringService.get(...code),
  );

  // All sections that are expandable in className format
  expandableClassNames: string[] = [this.getStringService.get('personalFinance', 'lowerCaseTitle')];
  isExpandable!: boolean;

  // If sections was hovered over
  isHovered: boolean = false;
  subsectionNameHovered: string = '';

  subsectionNameClicked: string = '';

  // Highlight lines above clicked subsection
  highlightAboveSubsectionsClicked: number[] = [];

  // Highlight lines above hovered over subsection
  highlightAboveSubsections: number[] = [];

  ngOnInit(): void {
    this.subsectionNameClicked = this.menuService.clickedSectionSubject.getValue().subsection || '';
    if (this.subsectionNameClicked) {
      this.highlightAboveSubsectionsClicked = this.getIndexesAbove(this.subsectionNameClicked);
    }

    this.setIsExpandable();
    this.setSubsectionClassNames();
  }

  private setIsExpandable(): void {
    this.isExpandable = this.expandableClassNames.includes(this.menuSectionClassName);
  }

  private setSubsectionClassNames(): void {
    this.subsectionClassNames = menuSubsectionClassNames((...code: string[]) =>
      this.getStringService.get(...code),
    );
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  onClick(): void {
    // Emit the sectionClicked event to notify the parent component
    this.sectionClicked.emit(this.menuSectionClassName);

    this.subsectionNameClicked = '';
    this.highlightAboveSubsectionsClicked = [];
  }

  onSubsectionClick(subsectionName: string): void {
    this.menuService.setClickedSubsection(subsectionName);

    this.subsectionNameClicked = subsectionName;
    this.highlightAboveSubsectionsClicked = this.getIndexesAbove(subsectionName);
  }

  onSubsectionHover(subsectionName: string): void {
    this.subsectionNameHovered = subsectionName;
    this.highlightAboveSubsections = this.getIndexesAbove(subsectionName);
  }

  getIndexesAbove(subsectionName: string): number[] {
    const index = this.subsectionClassNames.findIndex(
      (subsection) => subsection === subsectionName,
    );
    return Array.from({ length: index }, (_, i) => i);
  }
}
