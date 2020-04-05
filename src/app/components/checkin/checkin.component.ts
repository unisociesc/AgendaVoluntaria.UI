import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { IGeoLocationOptions, IGeoLocation } from 'src/app/models/geolocation.model';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  positionOptions: IGeoLocationOptions;

  constructor(private locationService: GeolocationService) { }

  ngOnInit(): void {
    this.setGeoLocationOptions();
  }

  doCheckin(): void {

  }

  doCheckout(): void {
    this.locationService.getUserLocation(this.positionOptions)
      .subscribe((location: IGeoLocation) => {
        if (location) {
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          console.log(latitude, longitude);
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
