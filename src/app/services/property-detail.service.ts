import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {catchError, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PropertyDetail} from '../models/property-detail';

@Injectable({
  providedIn: 'root'
})

export class PropertyDetailService {
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
  createPropertyDetail(id, item): Observable<PropertyDetail> {
    return this.http.post<PropertyDetail>(`${this.basePath}property/${id}/property-details`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Property by Id
  getPropertyDetailById(id): Observable<PropertyDetail> {
    return this.http.get<PropertyDetail>(`${this.basePath}properties/${id}/property-details`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Property
  updatePropertyDetail(id, item): Observable<PropertyDetail>{
    return this.http.put<PropertyDetail>(`${this.basePath}properties/${id}/property-details`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
