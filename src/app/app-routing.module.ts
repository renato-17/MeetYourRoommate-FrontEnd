import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdsComponent} from './pages/ads/ads.component';
import {MyprofileComponent} from './pages/myprofile/myprofile.component';


const routes: Routes = [
  {path: '', component: AdsComponent},
  {path: 'ads', component: AdsComponent},
  {path: 'myprofile', component: MyprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
