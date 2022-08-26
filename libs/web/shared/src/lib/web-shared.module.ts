import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { HeadingComponent } from './heading/heading.component';
import { StoryCardComponent } from './story-card/story-card.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    StoryCardComponent,
  ],
  exports: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    StoryCardComponent,
  ],
})
export class WebSharedModule {}
