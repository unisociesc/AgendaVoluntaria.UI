import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { MaterialModule } from './material';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';
import { ViewPsychologistComponent } from './components/view-psychologist/view-psychologist.component';
import { ViewScheduleDetailsComponent } from './components/view-schedule-details/view-schedule-details.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { HideElementsDirective } from './directives/hide-elements.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    ScheduleComponent,
    LogoutComponent,
    HomeComponent,
    ToolbarComponent,
    ViewScheduleComponent,
    ViewPsychologistComponent,
    ViewScheduleDetailsComponent,
    HideElementsDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MaterialModule,
    MatExpansionModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    RouterModule
  ],
  providers: [
    CookieService,
    { provide: Window, useValue: window },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
