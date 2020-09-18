import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Env} from '../../configs/env';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = Env.resourceServerRootURL + '/api/users';
    const body = {

    };

    return this.http.post<Array<User>>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  getSecret(): Observable<any> {
    const url = Env.resourceServerRootURL + '/user/secret';

    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

  deleteUserById(id: number): Observable<string> {
    return this.http.delete('' + id, {responseType: 'text'});
  }

  editUserById(id: number, user: User): Observable<any>{
    return this.http.put('' + id, user);
  }
}
