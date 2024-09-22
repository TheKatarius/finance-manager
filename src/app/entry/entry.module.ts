import { NgModule } from '@angular/core';

import { EntryRoutingModule } from '@app/entry/entry-routing.module';
import { EntryComponent } from '@app/entry/entry.component';

@NgModule({
  declarations: [EntryComponent],
  imports: [EntryRoutingModule],
})
export class EntryModule {}
