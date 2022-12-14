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
import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ImgDialogComponent } from './imgDialog/img-dialog.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { SkeletonRiderCardComponent } from './skeleton-rider-card/skeleton-rider-card.component';
import { ImageUploadPanelComponent } from './image-upload-panel/image-upload-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
  ],
  declarations: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    EventCardComponent,
    GalleryComponent,
    RaceResultsComponent,
    EventOverviewComponent,
    DialogComponent,
    ImgDialogComponent,
    SkeletonLoaderComponent,
    SkeletonRiderCardComponent,
    ImageUploadPanelComponent,
  ],
  exports: [
    SocialBarComponent,
    RiderCardComponent,
    HeadingComponent,
    EventCardComponent,
    GalleryComponent,
    RaceResultsComponent,
    EventOverviewComponent,
    ImgDialogComponent,
    DialogComponent,
    SkeletonRiderCardComponent,
    ImageUploadPanelComponent,
    SkeletonLoaderComponent,
  ],
})
export class WebSharedModule {}
