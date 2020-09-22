import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Token} from '../../models/token';
import {Env} from '../../configs/env';
import {catchError, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenSubject = new BehaviorSubject<Token>(this.parseToken());

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

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

  parseToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }

  logout(): Observable<any> {
    const url = `${Env.authServerAPIRootURL}/oauth/token/delete`;
    const body = this.tokenSubject.getValue();

    return this.http.post(url, body).pipe(
      tap(response => {
        localStorage.clear();
        this.tokenSubject.next(null);
        this.router.navigate(['']);
      }),
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

}
