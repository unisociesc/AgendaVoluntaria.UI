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
  private endpoint = 'shifts';
  private userShift = 'userShifts';
  private url = environment.endpoint;

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
      `${this.url}${this.endpoint}/${days}`, { headers: header.options }
    );
  }

  sendSchedule(payload): Observable<SchedulingDone> {
    const header = {
      options: new HttpHeaders({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.post<SchedulingDone>(
      `${this.url}${this.userShift}`, payload, { headers: header.options }
    );
  }
}
