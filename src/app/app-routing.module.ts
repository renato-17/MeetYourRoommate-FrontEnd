import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './pages/students/students.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {StudentComponent} from './pages/student/student.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {LessorProfileComponent} from './pages/lessor-profile/lessor-profile.component';
import {PropertyComponent} from './pages/property/property.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {TeamComponent} from './pages/team/team.component';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/new', component: PropertyComponent },
  { path: 'lessors/1/properties/:id', component: PropertyComponent },
  { path: 'lessors/:id', component: LessorProfileComponent},
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/new', component: TeamComponent },
  { path: 'teams/:id', component: TeamComponent},
  { path: 'reservations', component: ReservationsComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
