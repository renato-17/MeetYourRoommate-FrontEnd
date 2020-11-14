import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Ad} from '../models/ads';
import {url} from 'inspector';
import {catchError, retry} from 'rxjs/operators';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  basePath = 'https://meetyourroommateapi.herokuapp.com/swagger-ui/index.html?configUrl=/meetyourroommate-api-docs/swagger-config#/api/';
  constructor(private http: HttpClient) { }
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
  // Get Ad By Id
  getAd(id): Observable<Ad>{
    return this.http.get<Ad>(`${this.basePath}` + '/ads/' + `${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  // Get All Ads
  getAdList(): Observable<Ad>{
    return this.http.get<Ad>(`${this.basePath}` + '/ads/', this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student By Id
  getStudent(id): Observable<Student>{
    return this.http.get<Student>(`${this.basePath}` + '/students/' + `${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get All Students
  getStudentList(): Observable<Student>{
    return this.http.get<Student>(`${this.basePath}` + '/students/', this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
