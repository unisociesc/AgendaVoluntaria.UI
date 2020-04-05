import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';

import { AuthGuard } from './guards/auth.guard';
import { PsychologistComponent } from './components/psychologist/psychologist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'view/schedule', component: ViewScheduleComponent },
      { path: 'pysch', component: PsychologistComponent },
      { path: '**', redirectTo: '/' }
    ]
  },
  { path: 'login', redirectTo: '' },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
