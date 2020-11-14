import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PropertiesComponent} from './pages/properties/properties.component';
import {PropertyComponent} from './pages/property/property.component';
import {LessorProfileComponent} from './pages/lessor-profile/lessor-profile.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/new', component: PropertyComponent },
  { path: 'properties/:id', component: PropertyComponent },
  { path: 'lessors/:id', component: LessorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
