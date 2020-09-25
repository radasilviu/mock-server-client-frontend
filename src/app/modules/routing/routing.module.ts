import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {AuthGuard} from '../../guards/auth/auth.guard';
import {DashboardGuard} from '../../guards/dashboard/dashboard.guard';
import {MainPageComponent} from '../../components/main-page/main-page.component';
import {CompaniesComponent} from '../../components/dataTables/companies/companies.component';
import {BooksComponent} from '../../components/dataTables/books/books.component';

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
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
