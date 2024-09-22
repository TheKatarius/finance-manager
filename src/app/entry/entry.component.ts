import { ViewEncapsulation, Component } from '@angular/core';

@Component({
  selector: 'finance-manager-entry',
  templateUrl: './entry.component.html',
  // ViewEncapsulation.None - apply styles globally = default styles for all components
  encapsulation: ViewEncapsulation.None,
})
export class EntryComponent {}
