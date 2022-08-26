import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [SocialBarComponent],
  exports: [SocialBarComponent],
})
export class WebSharedModule {}
