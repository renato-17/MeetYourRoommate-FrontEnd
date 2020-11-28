import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Team} from '../models/team';
import {catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Team Endpoint
  basePath = 'https://cors-anywhere.herokuapp.com/https://meetyourrommateapi.herokuapp.com/api/';

  constructor(public http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

}
