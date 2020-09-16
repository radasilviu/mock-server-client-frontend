import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
