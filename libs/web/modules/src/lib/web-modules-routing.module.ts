import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { RaceComponent } from './race/race.component';
import { RacesOverviewComponent } from './races-overview/races-overview.component';
import { StoriesOverviewComponent } from './stories-overview/stories-overview.component';
import { StoryComponent } from './story/story.component';

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
      {
        path: 'admin',
        component: AdminComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class WebModulesRoutingModule {}
