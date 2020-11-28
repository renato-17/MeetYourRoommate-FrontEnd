// auth.service.ts
// Authentication Service

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://cors-anywhere.herokuapp.com/https://meetyourroommateapi.herokuapp.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      dni: credentials.dni,
      password: credentials.password
    }, httpOptions);
  }
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
