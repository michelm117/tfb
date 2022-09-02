import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { HeadingComponent } from './heading/heading.component';
import { EventCardComponent } from './event-card/event-card.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { EventContentComponent } from './event-content/event-content.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    EventCardComponent,
    GalleryComponent,
    RaceResultsComponent,
    EventOverviewComponent,
    EventContentComponent,
  ],
  exports: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    EventCardComponent,
    GalleryComponent,
    RaceResultsComponent,
    EventOverviewComponent,
    EventContentComponent,
  ],
})
export class WebSharedModule {}
