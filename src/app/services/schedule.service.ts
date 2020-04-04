import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ScheduleDates, SchedulingDone } from '../models/scheduler.model';
import { LoginService } from './login.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private shiftEndpoint = 'shifts';
  private userShiftEndpoint = 'userShifts';
  private apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getSchedule(days?: number): Observable<ScheduleDates> {
    const header = {
      options: new HttpHeaders({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.get<ScheduleDates>(
      `${this.apiURL}${this.shiftEndpoint}/${days}`, { headers: header.options }
    );
  }

  sendSchedule(payload): Observable<SchedulingDone> {
    const header = {
      options: new HttpHeaders({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.post<SchedulingDone>(
      `${this.apiURL}${this.userShiftEndpoint}`, payload, { headers: header.options }
    );
  }

  deleteSchedule(payload: object): Observable<any> {
    return this.http.delete<Observable<any>>(
      `${this.shiftEndpoint}${this.userShiftEndpoint}${payload}`
    );
  }
}
