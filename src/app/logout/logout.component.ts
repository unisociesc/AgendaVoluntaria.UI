import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LogoutService } from '../services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logoutService: LogoutService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.logoutService.logout();
    this.route.navigate(['login']);
  }
}
