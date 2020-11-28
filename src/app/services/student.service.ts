import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from '../models/student';
import {catchError, retry} from 'rxjs/operators';
import {HttpDataService} from './http-data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }
  // Create Student
  createItem(item): Observable<Student> {
    console.log(item);
    return this.http.post<Student>(`${this.basePath}students`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student by Id
  getItem(id): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}students/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student Data
  getList(): Observable<Student>{
    return this.http.get<Student>(`${this.basePath}students`)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Student
  updateItem(id, item): Observable<Student>{
    return this.http.put<Student>(`${this.basePath}students/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteItem(id): Observable<any> {
    return this.http.delete<Student>(`${this.basePath}students/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
