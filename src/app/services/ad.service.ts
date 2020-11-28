import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Ad} from '../models/ads';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }
  // Create Ad
  createItem(item): Observable<Ad> {
    return this.http.post<Ad>(`${this.basePath}ads`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Ad by Id
  getItem(id): Observable<Ad> {
    return this.http.get<Ad>(`${this.basePath}ads/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Ad Data
  getList(): Observable<Ad>{
    return this.http.get<Ad>(`${this.basePath}ads`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Ad
  updateItem(id, item): Observable<Ad>{
    return this.http.put<Ad>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Ad
  deleteItem(id): Observable<any> {
    return this.http.delete<Ad>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
