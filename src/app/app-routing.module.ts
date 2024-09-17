import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const MODULES_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./entry/entry.module').then((m) => m.EntryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(MODULES_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
