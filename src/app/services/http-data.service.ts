import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Property} from '../models/property';
import {Lessor} from '../models/lessor';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Endpoint
  basePath = 'https://meetyourroommateapi.herokuapp.com/api';
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
  // Create Property
  createProperty(item): Observable<Property> {
    return this.http.post<Property>(this.basePath + '/lessors/1/properties', JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Property by Id
  getPropertyById(id): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/lessors/1/properties/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Property Data
  getPropertyList(): Observable<Property>{
    return this.http.get<Property>(this.basePath + '/properties')
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Property
  updateProperty(id, item): Observable<Property>{
    return this.http.put<Property>(`${this.basePath}/lessors/1/properties/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteProperty(id): Observable<any> {
    return this.http.delete<Property>(`${this.basePath}/lessors/1/properties/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Lessor by Id
  getLessorById(id): Observable<Lessor> {
    return this.http.get<Lessor>(`${this.basePath}/lessors/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
}
