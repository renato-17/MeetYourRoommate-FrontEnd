import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './pages/students/students.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {StudentComponent} from './pages/student/student.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {LessorProfileComponent} from './pages/lessor-profile/lessor-profile.component';
import {PropertyComponent} from './pages/property/property.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/new', component: PropertyComponent },
  { path: 'lessors/1/properties/:id', component: PropertyComponent },
  { path: 'lessors/:id', component: LessorProfileComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
