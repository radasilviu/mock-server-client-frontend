import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SecretPageComponent } from './components/secret-page/secret-page.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { KeysPipe } from './pipes/keys/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainPageComponent,
    SecretPageComponent,
    UserEditComponent,
    KeysPipe
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
