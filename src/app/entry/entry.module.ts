import { NgModule } from '@angular/core';
import { EntryComponent } from '@app/entry/entry.component';
import { EntryRoutingModule } from '@app/entry/entry-routing.module';

@NgModule({
  declarations: [EntryComponent],
  imports: [EntryRoutingModule],
})
export class EntryModule {}
