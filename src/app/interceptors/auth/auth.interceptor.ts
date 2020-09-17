import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {TokenService} from '../../services/token/token.service';
import * as moment from 'moment';
import {Token} from '../../models/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.tokenSubject.getValue();
    const now = moment();

    if (token && now.unix() < token.accessTokenExpirationTime) {
      return next.handle(this.addAuthorizationHeader(request, token));
    } else if (request.url.endsWith('token')) {
      return next.handle(request);
    } else {
      // TO DO: Refresh the token
      console.error('Should refresh token');
    }

    console.error('This should only be called with refresh Token');
    return EMPTY;
  }

  addAuthorizationHeader(request, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token.access_token}`)
    });
  }

}
