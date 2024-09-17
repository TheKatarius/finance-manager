import { AppModule } from '@app/app.module';
import { enableProdMode, ViewEncapsulation } from '@angular/core';

import { environment } from '@env/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    defaultEncapsulation: ViewEncapsulation.None,
  })
  .catch((err) => console.error(err));
