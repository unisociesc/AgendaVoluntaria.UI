import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';
import { ViewPsychologistComponent } from './components/view-psychologist/view-psychologist.component';
import { ViewScheduleDetailsComponent } from './components/view-schedule-details/view-schedule-details.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'view/schedule', component: ViewScheduleComponent },
      { 
        path: 'view/psychologist', 
        component: ViewPsychologistComponent, 
        canActivate: [RoleGuard], 
        data: { 
          roles : ['psychologist'] 
        }
      },
      {
        path: 'view/schedule-details', 
        component: ViewScheduleDetailsComponent, 
        canActivate: [RoleGuard], 
        data: { 
          roles : ['coordinator'] 
        }
      },
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
