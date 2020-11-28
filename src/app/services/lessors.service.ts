import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {Observable} from 'rxjs';
import {Lessor} from '../models/lessor';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessorsService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }

  // Get Lessor by Id
  getLessorById(id): Observable<Lessor> {
    return this.http.get<Lessor>(`${this.basePath}lessors/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Create Lessor
  createItem(item): Observable<Lessor> {
    return this.http.post<Lessor>(`${this.basePath}lessors`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Lessor by Id
  getItem(id): Observable<Lessor> {
    return this.http.get<Lessor>(`${this.basePath}lessors/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Lessor Data
  getList(): Observable<Lessor>{
    return this.http.get<Lessor>(`${this.basePath}lessors`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Lessor
  updateItem(id, item): Observable<Lessor>{
    return this.http.put<Lessor>(`${this.basePath}lessors/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Lessor
  deleteItem(id): Observable<any> {
    return this.http.delete<Lessor>(`${this.basePath}lessors/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
