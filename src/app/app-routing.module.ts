import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'checkin', component: CheckinComponent },
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
