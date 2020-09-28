import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Book} from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

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
    const url = Env.resourceServerRootURL + '/api/book/list';
    return this.http.post(url, data)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  delete(title: string): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/book/${title}`;

    return this.http.delete(url)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  update(data: Book): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/book/update`;

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
