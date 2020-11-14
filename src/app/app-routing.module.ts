import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamsComponent} from './pages/teams/teams.component';
import {TeamComponent} from './pages/team/team.component';

const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/new', component: TeamComponent },
  { path: 'teams/:id', component: TeamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
