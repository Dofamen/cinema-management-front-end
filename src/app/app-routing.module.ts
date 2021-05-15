import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CinemaComponent} from './cinema/cinema.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  { path:'',redirectTo:'index', pathMatch: 'full' }, // redirect to default page is index
  { path: 'cinema', component: CinemaComponent },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
