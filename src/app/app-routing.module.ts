import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {SecretPageComponent} from './secret-page/secret-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'secret', component: SecretPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/edit', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
