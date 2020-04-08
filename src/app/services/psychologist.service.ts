import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  private apiURL = environment.apiUrl;
  private volunteerEndpoint = 'volunteers/needPsychologist';

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
}
