import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@app/core/data/auth.service';
import { GetStringService } from '@app/core/services/get-string.service';
import { NotificationService } from '@app/core/services/notifications.service';
import { MenuService } from '@app/menu/menu.service';
import { menuSectionClassNames } from '@app/menu/menu.utils';

@Component({
  selector: 'finance-manager-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../css/components/menu/menu.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  private getStringService = inject(GetStringService);

  private menuService = inject(MenuService);

  private menuSubscription!: Subscription;

  private authService = inject(AuthService);

  // All available section in className format
  sectionClassNames!: string[];

  // Dashboard is default active section
  activeSection!: string;

  ngOnInit(): void {
    this.sectionClassNames = menuSectionClassNames((...code: string[]) =>
      this.getStringService.get(...code),
    );

    this.menuSubscription = this.menuService.clickedSectionSubject.subscribe((state) => {
      this.activeSection = state.section;
    });
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
  }

  logoutUser(): void {
    this.authService.logout();
  }

  onSectionClick(sectionName: string): void {
    this.menuService.setClickedSection(sectionName);

    this.activeSection = sectionName;
  }
}
