import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SecretPageComponent } from './secret-page/secret-page.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainPageComponent,
    SecretPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
