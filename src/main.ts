import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [provideAnimations()],
    defaultEncapsulation: ViewEncapsulation.None,
  })
  .catch((err) => console.error(err));
