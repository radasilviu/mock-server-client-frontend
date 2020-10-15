import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {EMPTY, Observable, throwError} from 'rxjs';
import { Token } from '../../models/token';
import { TokenService } from '../../services/token/token.service';
import {catchError, switchMap} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: Token = this.tokenService.tokenSubject.getValue();



    if (request.headers.get('whitelist')) {
      return next.handle(request);
    }

    if (token) {
      const now = moment();
      const tokenExpireTime = moment(token.token_expire_time);
      const refreshTokenExpireTime = moment(token.refresh_token_expire_time);

      if (now.unix() < tokenExpireTime.unix()) {
        console.log("intra")

        return next.handle(this.addAuthorizationHeader(request, token)).pipe(catchError(error => {
          return this.handleError(error,this.tokenService)
        }))
      } else if (now.unix() < refreshTokenExpireTime.unix()) {
        return this.tokenService.generateNewAccessToken(token)
          .pipe(
            switchMap(
              token => {
                console.log("dsadas")
                localStorage.setItem('token', JSON.stringify(token))
                this.tokenService.tokenSubject.next(token);
                return next.handle(this.addAuthorizationHeader(request, token));
              },
            ),
            catchError(error => {
             return this.handleError(error,this.tokenService)
            })
        );
      }else{
        this.tokenService.logout().subscribe();
        console.log("logout")
        return EMPTY;
      }
    } else {
      console.log("logout")
      return EMPTY;
    }

  }

  handleError(error: HttpErrorResponse, tokenService: TokenService): Observable<never> {
    tokenService.logout().subscribe();
    return EMPTY;
  }

  addAuthorizationHeader(request: any, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
    });
  }

}
