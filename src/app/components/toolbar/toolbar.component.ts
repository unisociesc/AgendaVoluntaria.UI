import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { CheckinComponent } from '../checkin/checkin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { PsychologistService } from 'src/app/services/psychologist.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends CheckinComponent implements OnInit {

  private toaster = {
    sucessMessage: 'Ajuda solicitada com sucesso',
    btnOK: 'OK',
    timeout: 5000,
    cssClass: ['sucess-toaster']
  };


  constructor(
    private loginService: LoginService,
    private router: Router,
    private toasterServ: MatSnackBar,
    private location: GeolocationService,
    private pyschService: PsychologistService
  ) {
    super(location, toasterServ);
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

  callHelp(): void {
    this.pyschService.needHelp().subscribe(res => {
      if (res) {
        this.toasterServ.open(
          this.toaster.sucessMessage,
          this.toaster.btnOK,
          {
            duration: this.toaster.timeout,
            panelClass: this.toaster.cssClass
          }
        );
      }
    },
      (responseError: HttpErrorResponse) => {

      });
  }
}
