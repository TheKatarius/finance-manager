import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  clickedSectionSubject = new BehaviorSubject<{ section: string; subsection?: string }>({
    section: 'dashboard',
  });

  setClickedSection(section: string): void {
    this.clickedSectionSubject.next({ section });
  }

  setClickedSubsection(subsection: string): void {
    const currentState = this.clickedSectionSubject.getValue();
    const section = currentState.section || 'dashboard';

    this.clickedSectionSubject.next({ section, subsection });

    console.log(this.clickedSectionSubject.getValue());
  }
}
