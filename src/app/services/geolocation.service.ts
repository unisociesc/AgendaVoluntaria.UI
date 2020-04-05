import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IGeoLocation,
  IGeoLocationOptions,
  IGeolocationError
} from '../models/geolocation.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  private urlAPI = environment.apiUrl;
  private checkInEndpoint = 'check/in';
  private checkOutEndpoint = 'check/out';

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.urlAPI}${this.checkInEndpoint}`, payload);
  }

  doCheckOut(payload: object): Observable<any> {
    return this.http.post(`${this.urlAPI}${this.checkOutEndpoint}`, payload);
  }
}
