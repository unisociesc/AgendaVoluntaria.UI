import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IGeoLocation,
  IGeoLocationOptions,
  IGeolocationError
} from '../models/geolocation.model';

import { environment } from '../../environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  private urlAPI = environment.apiUrl;
  private checkInEndpoint = 'check/in';
  private checkOutEndpoint = 'check/out';

  private headerOptions = {
    options: new HttpHeaders({
      Authorization: `Bearer ${this.loginService.getToken()}`
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getUserLocation(options: IGeoLocationOptions): Observable<IGeoLocation> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: IGeoLocation) => {
          observer.next(position);
          observer.complete();
        }, (err) => {
          observer.error(this.geoLocationErrorHandle(err));
        },
          options
        );
      }
    });
  }

  private geoLocationErrorHandle(err: IGeolocationError): number {
    return err.code;
  }

  doCheckIn(payload: object): Observable<any> {
    return this.http.post(
      `${this.urlAPI}${this.checkInEndpoint}`, payload, { headers: this.headerOptions.options});
  }

  doCheckOut(payload: object): Observable<any> {
    return this.http.post(
      `${this.urlAPI}${this.checkOutEndpoint}`, payload, { headers: this.headerOptions.options});
  }
}
