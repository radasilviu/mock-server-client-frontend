import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth/auth.guard';
import {MainPageComponent} from '../../main-page/main-page.component';
import {SecretPageComponent} from '../../secret-page/secret-page.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: MainPageComponent },
  { path: 'secret', component: SecretPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
