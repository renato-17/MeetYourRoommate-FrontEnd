import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAd(): void {
    this.router.navigate(['/ads']).then(() => null);
  }
  navigateToTeam(): void {
    this.router.navigate(['/teams']).then(() => null);
  }
  navigateToRoommate(): void {
    this.router.navigate(['/students']).then(() => null);
  }
}
