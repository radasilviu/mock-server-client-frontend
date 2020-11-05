import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, throwError} from 'rxjs';
import {Book} from '../../models/book';

const rootUrl = Env.resourceServerRootURL;

export class EntityService {

  baseUrl: string;

  constructor(private apiUrlExtension: string,
              private http: HttpClient,
              private snackBar: MatSnackBar) {
    this.baseUrl = rootUrl + apiUrlExtension;
  }

  list(limit: number, pageIndex: number, filter: string = '', columns: string[], sortColumn: string, sortDirection: string): any {
    const data = {
      pageSize : limit,
      offset: pageIndex * limit,
      searchTerm: filter,
      columnsToSearchIn : columns,
      sortColumn,
      sortDirection
    };
    const url = this.baseUrl + '/list';
    return this.http.post(url, data)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  delete(bookId: string): Observable<any> {
    const url =  this.baseUrl + `/${bookId}`;

    return this.http.delete(url)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  update(bookId: string, book: Book): Observable<any> {
    const url =  this.baseUrl + `/update/${bookId}`;

    return this.http.put(url, book)
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
