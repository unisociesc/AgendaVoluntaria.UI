import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { AuthGuard } from './guards/auth.guard';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', redirectTo: '' },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'checkin', component: CheckinComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
