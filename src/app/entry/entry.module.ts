import { NgModule } from '@angular/core';

import { EntryRoutingModule } from '@app/entry/entry-routing.module';
import { EntryComponent } from '@app/entry/entry.component';
import { CommonModule } from '@common/common.module';

@NgModule({
  declarations: [EntryComponent],
  imports: [EntryRoutingModule, CommonModule],
})
export class EntryModule {}
