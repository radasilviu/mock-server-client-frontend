import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth/auth.guard';
import {DashboardGuard} from '../../guards/dashboard/dashboard.guard';
import {UserEditComponent} from '../../components/user-edit/user-edit.component';
import {MainPageComponent} from '../../components/main-page/main-page.component';
import {SecretPageComponent} from '../../components/secret-page/secret-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [DashboardGuard]
  },
  {
    path: 'secret',
    component: SecretPageComponent
  },
  {
    path: 'users/edit',
    component: UserEditComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
