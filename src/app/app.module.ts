import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CheckinComponent } from './components/checkin/checkin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogoutComponent } from './components/logout/logout.component';

import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';
import { PsychologistComponent } from './components/psychologist/psychologist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    ScheduleComponent,
    CheckinComponent,
    LogoutComponent,
    HomeComponent,
    ToolbarComponent,
    ViewScheduleComponent,
    PsychologistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
