import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import {PropertiesComponent} from './pages/properties/properties.component';
import {PropertyComponent} from './pages/property/property.component';
import {LessorProfileComponent} from './pages/lessor-profile/lessor-profile.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/new', component: PropertyComponent },
  { path: 'properties/:id', component: PropertyComponent },
  { path: 'lessors/:id', component: LessorProfileComponent}
=======
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reservations', component: ReservationsComponent }
>>>>>>> origin/feature/reservation_and_home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
