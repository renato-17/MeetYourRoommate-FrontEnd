import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {catchError, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Property} from '../models/property';
@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }
  // Create Property
  createProperty(id, item): Observable<Property> {
    return this.http.post<Property>(`${this.basePath}lessors/${id}/properties`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Property by Id
  getPropertyById(lessorId, id): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}lessors/${lessorId}/properties/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get List Property by LESSOR
  getListPropertyByLessorId(lessorId): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}lessor/${lessorId}/properties`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Property Data
  getPropertyList(): Observable<Property>{
    return this.http.get<Property>(`${this.basePath}properties`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Property
  updateProperty(lessorId, id, item): Observable<Property>{
    return this.http.put<Property>(`${this.basePath}lessors/${lessorId}/properties/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteProperty(lessorId, id): Observable<any> {
    return this.http.delete<Property>(`${this.basePath}lessors/${lessorId}/properties/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
