import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from '../../models/company';
import {Env} from '../../configs/env';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  list(limit: number, pageIndex: number, filter: string = '', columns: string[], sortColumn: string, sortDirection: string): any {
    const data = {
      limit: limit,
      offset: pageIndex * limit,
      filter: filter,
      columns: columns,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    };
    const url = Env.resourceServerRootURL + '/api/company/list';

    return this.http.post(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/company/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(data: Company, id: number): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/company/${id}`;

    return this.http.put(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      'Something bad happened; please try again later.');
  }
}
