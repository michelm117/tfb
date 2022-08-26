import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('@tfb/web/modules').then((m) => m.WebModulesModule),
  },
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('@tfb/web/modules').then((m) => m.WebModulesModule),
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //scrollPositionRestoration: 'enabled',
      // onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
