import { NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipeModules } from '@app/core/pipes/pipe.modules';
import { MenuRoutingModule } from '@app/menu/menu-routing.module';
import { MenuSectionComponent } from '@app/menu/menu-section/menu-section.component';
import { MenuSubsectionComponent } from '@app/menu/menu-section/menu-subsection/menu-subsection.component';
import { MenuComponent } from '@app/menu/menu.component';

@NgModule({
  declarations: [MenuComponent, MenuSectionComponent, MenuSubsectionComponent],
  imports: [MenuRoutingModule, NgClass, TitleCasePipe, PipeModules, NgForOf, NgIf],
})
export class MenuModule {}
