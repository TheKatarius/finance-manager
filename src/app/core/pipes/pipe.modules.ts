import { NgModule } from '@angular/core';

import { KebabToTitlePipe } from '@app/core/pipes/kebab-to-title-case.pipe';

@NgModule({
  declarations: [KebabToTitlePipe],
  imports: [],
  exports: [KebabToTitlePipe],
})
export class PipeModules {}
