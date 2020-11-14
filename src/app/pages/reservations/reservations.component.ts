import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from '../../models/reservation';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, AfterViewInit {
  @ViewChild('reservationForm', { static: false })
  reservationForm: NgForm;
  reservationData: Reservation;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'dateStart', 'dateEnd', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.reservationData = {} as Reservation;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllReservations();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllReservations(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      if (!response){
        return;
      }
      this.dataSource = new MatTableDataSource(response.content);
    });
  }
  editItem(element): void {
    console.log(element);
    this.reservationData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.reservationForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Reservation) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addReservation(): void {
    const newReservation = {dateStart: this.reservationData.dateStart, dateEnd: this.reservationData.dateEnd};
    this.httpDataService.createItem(newReservation).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateReservation(): void {
    this.httpDataService.updateItem(this.reservationData.id, this.reservationData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Reservation) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.reservationForm.form.valid) {
      if (this.isEditMode) {
        this.updateReservation();
      } else {
        this.addReservation();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
