import { NgModule } from '@angular/core';
import { MenuComponent } from '@app/menu/menu.component';
import { MenuRoutingModule } from '@app/menu/menu-routing.module';
import {
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { MenuSectionComponent } from '@app/menu/menu-section/menu-section.component';
import { PipeModules } from '@app/core/pipes/pipe.modules';
import { MenuSubsectionComponent } from '@app/menu/menu-section/menu-subsection/menu-subsection.component';

@NgModule({
  declarations: [MenuComponent, MenuSectionComponent, MenuSubsectionComponent],
  imports: [
    MenuRoutingModule,
    NgClass,
    TitleCasePipe,
    PipeModules,
    NgForOf,
    NgIf,
  ],
})
export class MenuModule {}
