import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  ScheduleDates,
  SchedulingDone,
  IUserScheduleData,
  IUserSchedule
} from '../models/scheduler.model';
import { LoginService } from './login.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private shiftEndpoint = 'shifts';
  private userShiftEndpoint = 'userShifts';
  private apiURL = environment.apiUrl;

  private header = {
    options: new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getSchedule(days?: number): Observable<ScheduleDates> {
    return this.http.get<ScheduleDates>(
      `${this.apiURL}${this.shiftEndpoint}/${days}`, { headers: this.header.options }
    );
  }

  getUserSchedule(): Observable<IUserScheduleData> {
    return this.http.get<IUserScheduleData>(
      `${this.apiURL}${this.userShiftEndpoint}/user`, { headers: this.header.options }
    );
  }

  getUserScheduleData(id: string): Observable<IUserSchedule> {
    return this.http.get<IUserSchedule>(
      `${this.apiURL}${this.shiftEndpoint}/${id}`, { headers: this.header.options }
    );
  }

  sendSchedule(payload): Observable<SchedulingDone> {
    return this.http.post<SchedulingDone>(
      `${this.apiURL}${this.userShiftEndpoint}`, payload, { headers: this.header.options }
    );
  }

  deleteSchedule(payload: object): Observable<any> {
    return this.http.delete<Observable<any>>(
      `${this.shiftEndpoint}${this.userShiftEndpoint}${payload}`
    );
  }
}
