import { Component, inject } from '@angular/core';
import { menuSectionClassNames } from '@app/menu/menu.utils';
import { GetStringService } from '@app/core/services/get-string.service';

@Component({
  selector: 'finance-manager-menu',
  templateUrl: './menu.component.html',
  styleUrl: '../../css/components/menu/menu.scss',
})
export class MenuComponent {
  private getStringService = inject(GetStringService);

  // All available section in className format
  sectionClassNames: string[] = menuSectionClassNames((...code: string[]) =>
    this.getStringService.get(...code)
  );

  // Dashboard is default active section
  activeSection: string = this.sectionClassNames[0];

  onSectionClick(sectionName: string): void {
    this.activeSection = sectionName;
  }
}
