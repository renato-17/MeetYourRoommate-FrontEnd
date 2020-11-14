import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdsComponent} from './pages/ads/ads.component';
import {StudentsComponent} from './pages/students/students.component';
import {StudentComponent} from './pages/student/student.component';
import {MyprofileComponent} from './pages/myprofile/myprofile.component';

const routes: Routes = [
  {path: 'ads', component: AdsComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'students/:id', component: StudentComponent},
  {path: 'profile', component: MyprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
