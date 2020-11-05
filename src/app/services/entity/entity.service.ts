import {Env} from '../../configs/env';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, throwError} from 'rxjs';

const rootUrl = Env.resourceServerRootURL;

export class EntityService<T> {

  baseUrl: string;

  constructor(protected apiUrlExtension: string,
              protected http: HttpClient,
              protected snackBar: MatSnackBar) {
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

  delete(entityId: string): Observable<any> {
    const url =  this.baseUrl + `/${entityId}`;

    return this.http.delete(url)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }

  // I'd rather not use any here in the future
  update(entityId: any, entity: T): Observable<any> {
    const url =  this.baseUrl + `/update/${entityId}`;

    return this.http.put(url, entity)
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
