import { OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GeolocationService } from 'src/app/services/geolocation.service';
import {
  IGeoLocationOptions,
  IGeoLocation,
  IGeoLocationResponse
} from 'src/app/models/geolocation.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export class CheckinComponent implements OnInit {

  positionOptions: IGeoLocationOptions;
  userLocation: IGeoLocationResponse;

  constructor(
    private locationService: GeolocationService,
    private toasterService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setGeoLocationOptions();
  }

  getUserGeoLocation(): Observable<any> {
    return new Observable(observer => {
      this.locationService.getUserLocation(this.positionOptions)
        .subscribe((location: IGeoLocation) => {
          if (location) {
            this.userLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            };
            observer.next(this.userLocation);
            observer.complete();
          }
        }, err => {
          observer.error(err);
        });
    });
  }

  sendCheckInCheckOut(): void {
    this.getUserGeoLocation()
      .subscribe((geoLocation: IGeoLocationResponse) => {
        this.locationService.doCheckIn(geoLocation).subscribe(res => {
          if (res) {
            this.toasterService.open('Check-in efetuado com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['sucess-toaster']
            });
          }
        },
        // !REST errors
        (error: HttpErrorResponse) => {
          if (error) {
            this.toasterService.open(error.message, 'OK', {
              duration: 5000,
              panelClass: ['error-toaster']
            });
          }
        });
      },
      // !Geolocations errors
      (err) => {
        switch (err) {
          case 1:
            this.toasterService.open(
              'É necessário permitir sua localização',
              'OK',
              {
                duration: 5000,
                panelClass: ['error-toaster']
              }
            );
            break;
          case 2:
            this.toasterService.open(
              'Não foi possível obter a localização, por favor tente novamente!',
              'OK',
              {
                duration: 5000,
                panelClass: ['error-toaster']
              }
            );
            break;
          case 3:
            this.toasterService.open(
              'Falha ao obter a localização, tente novamente ou conecte-se a uma rede WI-FI',
              'OK',
              {
                duration: 5000,
                panelClass: ['error-toaster']
              }
            );
            break;
        }
      });
  }

  setGeoLocationOptions(): void {
    this.positionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    };
  }
}
