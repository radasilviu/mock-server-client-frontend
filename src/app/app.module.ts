import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './modules/routing/routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { CompaniesComponent } from './components/dataTables/companies/companies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EditCompanyComponent } from './components/dialogs/edit-company/edit-company.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DeleteCompanyComponent } from './components/dialogs/delete-company/delete-company.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { BooksComponent } from './components/dataTables/books/books.component';
import { EditBookComponent } from './components/dialogs/edit-book/edit-book.component';
import { DeleteBookComponent } from './components/dialogs/delete-book/delete-book.component';
import {MAT_CHECKBOX_CLICK_ACTION, MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainPageComponent,
    KeysPipe,
    CompaniesComponent,
    EditCompanyComponent,
    DeleteCompanyComponent,
    BooksComponent,
    EditBookComponent,
    DeleteBookComponent,
    FilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
