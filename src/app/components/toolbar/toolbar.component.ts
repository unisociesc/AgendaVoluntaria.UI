import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

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
