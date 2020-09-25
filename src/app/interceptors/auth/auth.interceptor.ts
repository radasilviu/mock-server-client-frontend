import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Token } from '../../models/token';
import { TokenService } from '../../services/token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: Token = this.tokenService.tokenSubject.getValue();



    if (request.headers.has("WhiteList")) {
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
            this.tokenService.tokenSubject.next(token);
          }
        );
        return;
      }
    } else {
      return next.handle(request);
    }

  }

  addAuthorizationHeader(request: any, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
    });
  }

}
