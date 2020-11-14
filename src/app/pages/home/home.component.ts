import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToReservations(): void {
    this.router.navigate(['/reservations']).then(() => null);
  }
  navigateToLessorProfile(): void {
    this.router.navigate(['/lessors/1']).then(() => null);
  }
  navigateToStudentProfile(): void {
    this.router.navigate(['/students/2']).then(() => null);
  }
}
