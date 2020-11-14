import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {Observable} from 'rxjs';
import {Team} from '../models/team';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }
  // Create Team
  createItem(item): Observable<Team> {
    return this.http.post<Team>(this.basePath, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team by Id
  getItem(id): Observable<Team> {
    return this.http.get<Team>(`${this.basePath}/${id}`, this.httpOptions )
        .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team Data
  getList(): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.basePath}teams`)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Update Team
  updateItem(id, item): Observable<Team>{
    return this.http.put<Team>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Team
  deleteItem(id): Observable<any> {
    return this.http.delete<Team>(`${this.basePath}/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
