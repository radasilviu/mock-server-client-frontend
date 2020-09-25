import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { Token } from '../../models/token';
import { TokenService } from '../../services/token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: Token = this.tokenService.tokenSubject.getValue();



    if (request.headers.get("whitelist")) {
      return next.handle(request);
    }

    if (token) {
      const now = moment();
      const tokenExpireTime = moment(token.token_expire_time);
      const refreshTokenExpireTime = moment(token.refresh_token_expire_time);
      if (now.unix() < tokenExpireTime.unix()) {
        return next.handle(this.addAuthorizationHeader(request, token));
      } else if (now.unix() < refreshTokenExpireTime.unix()) {
        this.tokenService.generateNewAccessToken(token).subscribe(
          (token: Token) => {
            localStorage.setItem("token", JSON.stringify(token))
            this.tokenService.tokenSubject.next(token);
            return next.handle(request);
          },
          (error: any) => {
            this.tokenService.logout();
            return;
          }
        );
      }else{
        this.tokenService.logout();
        return;
      }
    } else {
      return EMPTY;
      // return next.handle(request);
    }

  }

  addAuthorizationHeader(request: any, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
    });
  }

}
