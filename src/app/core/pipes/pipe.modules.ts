import { NgModule } from '@angular/core';

import { KebabToTitlePipe } from '@app/core/pipes/kebab-to-title-case.pipe';
import { PascalToKebabCasePipe } from '@app/core/pipes/pascal-to-kebab-case.pipe';

const COMMON_PIPES = [KebabToTitlePipe, PascalToKebabCasePipe];

@NgModule({
  declarations: [...COMMON_PIPES],
  imports: [],
  exports: [...COMMON_PIPES],
})
export class PipeModules {}
