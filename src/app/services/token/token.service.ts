import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Env } from '../../configs/env';
import { Token } from '../../models/token';

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
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.post<Token>(url, body, options).pipe(
      tap((token: Token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
      }),
      catchError(error => {
        return this.handleError(error, this.snackBar);
      })
    );
  }

  generateNewAccessToken(token: Token): Observable<Token> {
    const url = Env.authServerAPIRootURL + '/oauth/refreshToken';
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.put<Token>(url, token, options);
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
    const options = {
      headers: {
        'whitelist': 'true'
      }
    };

    return this.http.post(url, body,options).pipe(
      tap(response => {
        localStorage.clear();
        this.tokenSubject.next(null);
        this.router.navigate(['']);
      }),
      catchError(error => {
        return this.handleLogoutError(error, this.snackBar);
      })
    );
  }

  handleLogoutError(error: HttpErrorResponse, snackBar: MatSnackBar): Observable<never> {
    console.error(error);
    snackBar.open('Your session has been expired, please login!', '', {
      duration: 3000
    });
    return throwError(error.message);
  }

}
