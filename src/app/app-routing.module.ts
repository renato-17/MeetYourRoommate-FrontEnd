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
import {AdsComponent} from "./pages/ads/ads.component";
import {MyprofileComponent} from "./pages/myprofile/myprofile.component";
import {RegisterStudentComponent} from "./pages/register-student/register-student.component";
import {RegisterLessorComponent} from "./pages/register-lessor/register-lessor.component";
import {LoginLessorComponent} from "./pages/login-lessor/login-lessor.component";
import {LoginStudentComponent} from "./pages/login-student/login-student.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/:id', component: StudentProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'lessors/:lessorId/properties', component: PropertiesComponent },
  { path: 'lessors/:lessorId/properties/new', component: PropertyComponent },
  { path: 'lessors/:lessorId/properties/:id', component: PropertyComponent },
  { path: 'lessors/:id', component: LessorProfileComponent},
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/new', component: TeamComponent },
  { path: 'teams/:id', component: TeamComponent},
  { path: 'reservations', component: ReservationsComponent },
  {path: 'ads', component: AdsComponent},
  {path: 'myprofile', component: MyprofileComponent},
  {path: 'registerStudent', component: RegisterStudentComponent},
  {path: 'registerLessor', component: RegisterLessorComponent},
  {path: 'loginStudent', component: LoginStudentComponent},
  {path: 'loginLessor', component: LoginLessorComponent},
  {path: 'loginLessor', component: LoginLessorComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
