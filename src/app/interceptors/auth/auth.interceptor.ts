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

    if (token) {
      return next.handle(this.addAuthorizationHeader(request, token));
    } else {
      return next.handle(request);
    }
  }

  addAuthorizationHeader(request, token: Token): any {
    return request.clone({
      headers: request.headers.set('Authorization', `${token.access_token}`)
    });
  }

}
