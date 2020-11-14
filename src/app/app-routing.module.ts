import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reservations', component: ReservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
