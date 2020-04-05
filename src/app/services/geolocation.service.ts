import { Injectable } from '@angular/core';
import { IGeoLocation, IGeoLocationOptions, IGeolocationError } from '../models/geolocation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  constructor() { }

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

  private geoLocationErrorHandle(err: IGeolocationError): void {
    switch (err.code) {
      //* Timeout error
      case 3:
        console.log(3);
        break;
      //* Can't get data
      case 2:
        console.log(2);
        break;
      //* User dont' allowed get geolocation
      case 1:
        console.log(1);
    }
  }
}
