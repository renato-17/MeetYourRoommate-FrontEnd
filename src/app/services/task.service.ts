import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "../models/task";
import {catchError, retry} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {HttpDataService} from "./http-data.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }
  // Create Task
  createItem(teamId,item): Observable<Task> {
    return this.http.post<Task>(`${this.basePath}teams/${teamId}/tasks`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Task by Id
  getItem(teamId,id): Observable<Task> {
    return this.http.get<Task>(`${this.basePath}teams/${teamId}/tasks/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Task Data
  getList(teamId): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.basePath}teams/${teamId}/tasks`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Task Team
  updateItem(teamId,id, item): Observable<Task>{
    return this.http.put<Task>(`${this.basePath}teams/${teamId}/tasks/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  patchItem(teamId,id): Observable<Task>{
    return this.http.patch<Task>(`${this.basePath}teams/${teamId}/tasks/${id}`,this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Task
  deleteItem(teamId,id): Observable<any> {
    return this.http.delete<Task>(`${this.basePath}teams/${teamId}/tasks/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
