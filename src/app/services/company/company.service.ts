import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from '../../models/company';
import {Env} from '../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  list(limit: number, pageIndex: number, filter: string = '', columns: string[], sortColumn: string, sortDirection: string): any {
    const data = {
      pageSize : limit,
      offset: pageIndex * limit,
      searchTerm: filter,
      columnsToSearchIn : columns,
      sortColumn,
      sortDirection
    };
    const url = Env.resourceServerRootURL + '/api/company/list';

    return this.http.post(url, data)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  delete(id: number): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/company/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  update(data: Company, id: number): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/company/${id}`;

    return this.http.put(url, data)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  handleError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    console.error(error);
    snackBar.open('Something bad happened, please try again later.', '', {
      duration: 3000
    });
    return throwError(error.message);
  }
}
