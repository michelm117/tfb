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
import { AdminComponent } from './admin/admin.component';
import { RiderTabComponent } from './admin/tabs/rider-tab/rider-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { StoryTabComponent } from './admin/tabs/story-tab/story-tab.component';
import { RaceTabComponent } from './admin/tabs/race-tab/race-tab.component';
import { AboutTabComponent } from './admin/tabs/about-tab/about-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DeleteRiderPanelComponent } from './admin/tabs/rider-tab/panels/delete-rider-panel/delete-rider-panel.component';
import UpdateRiderPanelComponent from './admin/tabs/rider-tab/panels/update-rider-panel/update-rider-panel.component';
import { AddRiderPanelComponent } from './admin/tabs/rider-tab/panels/add-rider-panel/add-rider-panel.component';
import { CountryTabComponent } from './admin/tabs/country-tab/country-tab.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AgeCategoryTabComponent } from './admin/tabs/age-category-tab/age-category-tab.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@tfb/web/data';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './register/register.component';

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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'admin',
        component: AdminComponent,
      },
    ],
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    // own modules
    WebSharedModule,
    // WebModulesRoutingModule,
    RouterModule.forChild(routes),

    // nx material
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    NgxMatFileInputModule,
  ],
  declarations: [
    AboutComponent,
    StoriesOverviewComponent,
    StoryComponent,
    RacesOverviewComponent,
    RaceComponent,
    AdminComponent,
    RiderTabComponent,
    StoryTabComponent,
    RaceTabComponent,
    AboutTabComponent,
    DeleteRiderPanelComponent,
    UpdateRiderPanelComponent,
    AddRiderPanelComponent,
    CountryTabComponent,
    PageNotFoundComponent,
    AgeCategoryTabComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
  ],
  exports: [AboutComponent, StoriesOverviewComponent],
})
export class WebModulesModule {}
