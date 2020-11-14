import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './pages/students/students.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StudentComponent } from './pages/student/student.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyComponent } from './pages/property/property.component';
import { LessorProfileComponent } from './pages/lessor-profile/lessor-profile.component';
import {TeamComponent} from './pages/team/team.component';
import {TeamsComponent} from './pages/teams/teams.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';

@NgModule({
  declarations: [
    TeamComponent,
    AppComponent,
    StudentsComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    StudentComponent,
    PropertiesComponent,
    PropertyComponent,
    LessorProfileComponent,
    TeamsComponent,
    ReservationsComponent,
    StudentProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
