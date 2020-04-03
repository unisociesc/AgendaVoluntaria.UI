import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endpoint = 'auth/login';
  private token: string;
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
}
