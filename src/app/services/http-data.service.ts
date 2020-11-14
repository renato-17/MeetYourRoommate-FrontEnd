import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Reservation} from '../models/reservation';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Reservations Endpoint
  basePath = 'https://meetyourroommateapi.herokuapp.com/api/';
  constructor(private http: HttpClient) { }
  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Reservation
  createItem(item): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.basePath}reservations`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Reservation by Id
  getItem(id): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.basePath}reservations/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Reservation Data
  getList(): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.basePath}reservations`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Reservation
  updateItem(id, item): Observable<Reservation>{
    return this.http.put<Reservation>(`${this.basePath}reservations/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Reservation
  deleteItem(id): Observable<any> {
    return this.http.delete<Reservation>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
