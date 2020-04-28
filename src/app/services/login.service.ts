import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endpoint = 'auth/login';
  private token: string;
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(email: string, password: string): Observable<any> {
    const payload = {
      email,
      password
    };

    return this.http.post<Observable<any>>(
      `${this.url}${this.endpoint}`, payload
    ).pipe(
      tap(res => {
        this.token = res.data.token;
      })
    );
  }

  setToken(): void {
    this.cookieService.set('jwt.token', this.getToken());
  }

  getToken(): string {
    return this.token;
  }

  decodeJWT(): any {
    return jwt_decode(this.getToken());
  }

  getUserInfoJWT(): string {
    const decodedToken = this.decodeJWT();
    return decodedToken.IdUser;
  }

  getUserRole(): string {
    return this.decodeJWT().role;
  }
}
