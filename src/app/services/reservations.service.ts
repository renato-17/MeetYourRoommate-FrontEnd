import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpDataService} from './http-data.service';
import {Observable} from 'rxjs';
import {Reservation} from '../models/reservation';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private http: HttpClient;
  private basePath: any;
  private httpOptions: any;
  private handleError: any;

  constructor(private httpDataService: HttpDataService) {
    this.http = httpDataService.http;
    this.basePath = httpDataService.basePath;
    this.httpOptions = httpDataService.httpOptions;
  }

  // Create Reservation
  createReservation(item): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.basePath}reservations`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Get Reservation by Id
  getReservation(id): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.basePath}reservations/${id}`, this.httpOptions )
        .pipe(retry(2), catchError(this.handleError));
  }
  // Get Reservation Data
  getReservationList(): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.basePath}reservations`)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Update Reservation
  updateReservation(id, item): Observable<Reservation>{
    return this.http.put<Reservation>(`${this.basePath}reservations/${id}`, JSON.stringify(item), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Reservation
  deleteReservation(id): Observable<any> {
    return this.http.delete<Reservation>(`${this.basePath}reservations/${id}`, this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }
}
