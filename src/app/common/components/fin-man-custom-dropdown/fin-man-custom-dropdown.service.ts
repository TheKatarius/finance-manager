import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomDropdownService {
  private clearSelectedSubject = new Subject<void>();

  clearSelected$ = this.clearSelectedSubject.asObservable();

  emitClearSelectedSubject(): void {
    this.clearSelectedSubject.next();
  }
}
