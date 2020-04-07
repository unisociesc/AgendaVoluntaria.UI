import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { CheckinComponent } from '../checkin/checkin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends CheckinComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toaster: MatSnackBar,
    private location: GeolocationService
  ) {
    super(location, toaster);
  }

  ngOnInit() {
  }

  isAuth() {
    return this.loginService.getToken() != null;
  }

  getUserName() {
    return this.isAuth()
      ? this.loginService.decodeJWT().unique_name
      : 'Visitante';
  }

  getEmailAccount() {
    return this.isAuth()
      ? this.loginService.decodeJWT().email
      : 'Não autenticado';
  }

  goHome() {
    this.router.navigate(['home']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}
