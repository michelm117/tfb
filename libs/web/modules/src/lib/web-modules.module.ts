import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WebSharedModule } from '@tfb/web/shared';
import { StoriesOverviewComponent } from './stories-overview/stories-overview.component';
import { StoryComponent } from './story/story.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RacesOverviewComponent } from './races-overview/races-overview.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'stories',
        component: StoriesOverviewComponent,
      },
      {
        path: 'stories/:id',
        component: StoryComponent,
      },
      {
        path: 'races',
        component: RacesOverviewComponent,
      },
      {
        path: 'races/:id',
        component: RaceComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,

    // own modules
    WebSharedModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    AboutComponent,
    StoriesOverviewComponent,
    StoryComponent,
    RacesOverviewComponent,
    RaceComponent,
  ],
  exports: [AboutComponent, StoriesOverviewComponent],
})
export class WebModulesModule {}
