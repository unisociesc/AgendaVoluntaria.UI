import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
import { IVolunteerNeedPsychologistData } from '../models/psychologist.model';
import { IViewVolunteerNeedPsychologistTable } from '../models/view-psychologist-table.model';

@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  private apiURL = environment.apiUrl;
  
  private volunteerEndpoint = 'volunteers/needPsychologist';
  private volunteerNeedPsychologistEndpoint = 'volunteers/needPsychologist';

  private JWTToken = {
    options: new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  needHelp(): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}${this.volunteerEndpoint}`, null, { headers: this.JWTToken.options }
    );
  }

  getVolunteersNeedPsychologist(): Observable<IVolunteerNeedPsychologistData> {
    return this.http.get<IVolunteerNeedPsychologistData>(
      `${this.apiURL}${this.volunteerNeedPsychologistEndpoint}`,
      { headers: this.JWTToken.options }
    );
  }

  helpVolunteer(volunteerId: string) {
    return this.http.put<any>(
      `${this.apiURL}${this.volunteerEndpoint}/${volunteerId}`,
      { needPsico: false },
      { headers: this.JWTToken.options }
    );
  }
}
