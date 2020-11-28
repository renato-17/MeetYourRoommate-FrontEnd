import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Team} from "../models/team";
import {catchError, retry} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {HttpDataService} from "./http-data.service";

// este es slo para la prueba
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
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
    return this.http.post<Team>(`${this.basePath}teams`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team by Id
  getItem(id): Observable<Team> {
    return this.http.get<Team>(`${this.basePath}teams/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team Data
  getList(): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.basePath}teams`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Team
  updateItem(id, item): Observable<Team>{
    return this.http.put<Team>(`${this.basePath}teams/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Team
  deleteItem(id): Observable<any> {
    return this.http.delete<Team>(`${this.basePath}teams/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team by StudentId
  getTeamByStudent(id): Observable<Team>{
    return this.http.get<Team[]>(`${this.basePath}students/${id}/team`)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Student Data
  getListStudent(id): Observable<Student>{
    return this.http.get<Student>(`${this.basePath}teams/${id}/students`)
      .pipe(retry(2), catchError(this.handleError));

  }
}
