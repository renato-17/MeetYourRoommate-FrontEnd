import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { PropertiesComponent } from './pages/properties/properties.component';
=======
>>>>>>> origin/feature/reservation_and_home
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
<<<<<<< HEAD
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
=======
import { MatFormFieldModule } from '@angular/material/form-field';
>>>>>>> origin/feature/reservation_and_home
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import {PropertyComponent} from './pages/property/property.component';
import { LessorProfileComponent } from './pages/lessor-profile/lessor-profile.component';

=======
import {ReservationsComponent} from './pages/reservations/reservations.component';
import { HomeComponent } from './pages/home/home.component';
>>>>>>> origin/feature/reservation_and_home

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    PropertiesComponent,
    PropertyComponent,
    LessorProfileComponent
=======
    ReservationsComponent,
    HomeComponent
>>>>>>> origin/feature/reservation_and_home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
