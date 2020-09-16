import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Token} from '../../models/token';
import {Env} from '../../configs/env';
import {catchError, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken(): Observable<Token> {
    const url = Env.authServerRootURL + '/api/oauth/token';

    const body = {
      grant_type: 'authorization',
      client_id: Env.clientId,
      client_secret: Env.clientSecret,
      code: localStorage.getItem('code'),
      scope: ''
    };

    return this.http.post<Token>(url, body).pipe(
      tap(token => {
        const expiresAt = moment().add(token.expiresIn, 'seconds');
        localStorage.setItem('token', JSON.stringify(token));
        token.accessTokenExpirationTime = moment().add(token.expiresIn, 'seconds').unix();

        this.tokenSubject.next(token);
      }),
      catchError(this.handleError)
    );

    return null;
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

  parseAccessToken(): string {
    return JSON.parse(localStorage.getItem('token')).access_token;
  }

  logout(): Promise<boolean> {
    localStorage.clear();
    this.tokenSubject.next(null);
    return this.router.navigate(['']);
  }

}
