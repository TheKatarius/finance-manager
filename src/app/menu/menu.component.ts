import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GetStringService } from '@app/core/services/get-string.service';
import { MenuService } from '@app/menu/menu.service';
import { menuSectionClassNames } from '@app/menu/menu.utils';

@Component({
  selector: 'finance-manager-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../css/components/menu/menu.scss'],
})
export class MenuComponent implements OnInit {
  private getStringService = inject(GetStringService);

  private menuService = inject(MenuService);

  // All available section in className format
  sectionClassNames!: string[];

  // Dashboard is default active section
  activeSection!: string;
  private router = inject(Router);

  ngOnInit(): void {
    this.sectionClassNames = menuSectionClassNames((...code: string[]) =>
      this.getStringService.get(...code),
    );

    this.activeSection = this.menuService.clickedSectionSubject.getValue().section;
    console.log(this.router.url.split('/'));
  }

  onSectionClick(sectionName: string): void {
    this.menuService.setClickedSection(sectionName);

    this.activeSection = sectionName;
  }
}
