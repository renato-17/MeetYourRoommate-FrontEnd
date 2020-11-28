import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }
  navigateToReservations(): void {
    this.router.navigate(['/reservations']).then(() => null);
  }
  navigateToLogInStudent(): void {
    this.router.navigate(['/loginStudent/']).then(() => null);
  }
  navigateToRegisterStudent(): void {
    this.router.navigate(['/registerStudent/']).then(() => null);
  }
  navigateToLogInLessor(): void {
    this.router.navigate(['/loginLessor/']).then(() => null);
  }
  navigateToRegisterLessor(): void {
    this.router.navigate(['/registerLessor/']).then(() => null);
  }
}
