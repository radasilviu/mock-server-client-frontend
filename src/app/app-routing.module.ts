import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {SecretPageComponent} from './secret-page/secret-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'secret', component: SecretPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
