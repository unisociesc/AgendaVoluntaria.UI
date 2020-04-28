import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { IScheduleDetailsData } from '../models/schedule-details.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailsService {
  private apiURL = environment.apiUrl;
  
  private shiftsEndpoint = 'shifts/users';

  private JWTToken = {
    options: new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  getShiftsDetails(days?: number): Observable<IScheduleDetailsData> {
    return this.http.get<IScheduleDetailsData>(
      `${this.apiURL}${this.shiftsEndpoint}/${days}`,
      { headers: this.JWTToken.options }
    );
  }
}
