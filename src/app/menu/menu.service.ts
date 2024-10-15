import { inject, Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private router: Router;

  // Używamy BehaviorSubject do przechowywania aktualnej sekcji i podsekcji
  clickedSectionSubject = new BehaviorSubject<{ section: string; subsection?: string }>({
    section: 'dashboard', // Domyślna sekcja
    subsection: undefined,
  });

  constructor(router: Router) {
    this.router = router;

    // Subskrybujemy zdarzenia nawigacji
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSectionFromUrl(event.urlAfterRedirects);
      });

    // Inicjalizujemy stan na podstawie aktualnego URL po zarejestrowaniu subskrypcji
    this.updateSectionFromUrl(this.router.url);
  }

  private updateSectionFromUrl(url: string): void {
    const urlSegments = url.split('/').filter((segment) => segment);
    const section = urlSegments[0] || 'dashboard';
    const subsection = urlSegments[1];

    // Aktualizujemy BehaviorSubject
    this.clickedSectionSubject.next({ section, subsection });
  }

  setClickedSection(section: string): void {
    const currentState = this.clickedSectionSubject.getValue();
    this.clickedSectionSubject.next({ ...currentState, section, subsection: undefined });
  }

  setClickedSubsection(subsection: string): void {
    const currentState = this.clickedSectionSubject.getValue();
    this.clickedSectionSubject.next({ ...currentState, subsection });
  }
}
