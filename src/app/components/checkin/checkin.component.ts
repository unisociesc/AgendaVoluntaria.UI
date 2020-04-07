import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GeolocationService } from 'src/app/services/geolocation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  IGeoLocationOptions,
  IGeoLocation,
  IGeoLocationResponse
} from 'src/app/models/geolocation.model';

export class CheckinComponent implements OnInit {

  positionOptions: IGeoLocationOptions;
  userLocation: IGeoLocationResponse;
  toasterOptions: MatSnackBarConfig;
  messages = {
    checkInSucess: 'Check-in efetuado com sucesso',
    checkOutSucess: 'Check-out efetuado com sucesso',
    locationNotAllowed: 'É necessário permitir sua localização',
    locationError: 'Não foi possível obter a localização, por favor tente novamente!',
    locationTimeout: 'Falha ao obter a localização, tente novamente ou conecte-se a uma rede WI-FI',
    btnOK: 'OK',
  };

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

  doCheckOut(): void {
    this.getUserGeoLocation()
      .subscribe((geoLocation: IGeoLocationResponse) => {
        this.locationService.doCheckOut(geoLocation).subscribe(res => {
          if (res) {
            this.toasterService.open(
              this.messages.checkOutSucess,
              this.messages.btnOK,
              this.toasterOptionsHandle(false)
            );
          }
        },
        // !REST errors
        (responeFail: HttpErrorResponse) => {
          if (responeFail) {
            this.toasterService.open(
              responeFail.error.errors,
              this.messages.btnOK,
              this.toasterOptionsHandle(true)
            );
          }
        });
      },
      // !Geolocations errors
      (err) => {
        this.geolocationErrorHandle(err);
      }
    );
  }

  doCheckIn(): void {
    this.getUserGeoLocation()
      .subscribe((geoLocation: IGeoLocationResponse) => {
        this.locationService.doCheckIn(geoLocation).subscribe(res => {
          if (res) {
            this.toasterService.open(
              this.messages.checkInSucess,
              this.messages.btnOK,
              this.toasterOptionsHandle(false)
            );
          }
        },
        // !REST errors
        (responeFail: HttpErrorResponse) => {
          if (responeFail) {
            this.toasterService.open(
              responeFail.error.errors,
              this.messages.btnOK,
              this.toasterOptionsHandle(true)
            );
          }
        });
      },
      // !Geolocations errors
      (err) => {
        this.geolocationErrorHandle(err);
      }
    );
  }

  geolocationErrorHandle(errorNUmber: number): void {
    switch (errorNUmber) {
      case 1:
        this.toasterService.open(
          this.messages.locationNotAllowed,
          this.messages.btnOK,
          this.toasterOptionsHandle(true)
        );
        break;
      case 2:
        this.toasterService.open(
          this.messages.locationNotAllowed,
          this.messages.btnOK,
          this.toasterOptionsHandle(true)
        );
        break;
      case 3:
        this.toasterService.open(
          this.messages.locationTimeout,
          this.messages.btnOK,
        );
        break;
    }
  }

  toasterOptionsHandle(error?: boolean): MatSnackBarConfig {
    return this.toasterOptions = {
      duration: 5000,
      panelClass: error ? ['error-toaster'] : ['sucess-toaster']
    };
  }

  setGeoLocationOptions(): void {
    this.positionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    };
  }
}
