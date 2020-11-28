import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-lessor',
  templateUrl: './home-lessor.component.html',
  styleUrls: ['./home-lessor.component.css']
})
export class HomeLessorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToProperty(): void {
    this.router.navigate(['/properties']).then(() => null);
  }
  navigateToReservation(): void {
    this.router.navigate(['/reservations']).then(() => null);
  }
}
