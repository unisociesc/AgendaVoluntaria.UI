import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleDates, SchedulingDone } from '../models/scheduler.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url = 'https://agendavoluntaria.herokuapp.com';
  private endpoint = 'api/shifts';
  private userShift = 'api/userShifts';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getAllSchedule(): Observable<ScheduleDates> {
    const header = {
      options: new HttpHeaders({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.get<ScheduleDates>(
      `${this.url}/${this.endpoint}`, { headers: header.options }
    );
  }

  sendSchedule(payload): Observable<SchedulingDone> {
    const header = {
      options: new HttpHeaders({
        Authorization: `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.post<SchedulingDone>(
      `${this.url}/${this.userShift}`, payload, { headers: header.options }
    );
  }
}
