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

  tokenSubject = new BehaviorSubject<Token>(this.parseToken());

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken(code: string): Observable<Token> {
    const url = Env.authServerAPIRootURL + '/oauth/token';
    const body = {
      clientCode: code
    };

    return this.http.post<Token>(url, body).pipe(
      tap(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

  parseToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }

  logout(): Promise<boolean> {
    localStorage.clear();
    this.tokenSubject.next(null);
    return this.router.navigate(['']);
  }

}
