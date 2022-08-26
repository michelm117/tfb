import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WebSharedModule } from '@tfb/web/shared';

@NgModule({
  imports: [
    CommonModule,

    // own modules
    WebSharedModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent],
})
export class WebModulesModule {}
