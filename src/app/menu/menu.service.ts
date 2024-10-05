import { inject, Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private router = inject(Router);

  clickedSectionSubject = new BehaviorSubject<{ section: string; subsection?: string }>({
    section: this.router.url.split('/')[1],
    subsection: this.router.url.split('/')?.[2],
  });

  setClickedSection(section: string): void {
    this.clickedSectionSubject.next({ section });
  }

  setClickedSubsection(subsection: string): void {
    const currentState = this.clickedSectionSubject.getValue();
    const section = currentState.section || 'dashboard';

    this.clickedSectionSubject.next({ section, subsection });
  }
}
