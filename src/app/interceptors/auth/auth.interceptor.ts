import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {EMPTY, Observable} from 'rxjs';
import {Token} from '../../models/token';
import {TokenService} from '../../services/token/token.service';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {
  }

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
        return next.handle(this.addAuthorizationHeader(request, token));
      } else if (now.unix() < refreshTokenExpireTime.unix()) {
        return this.tokenService.generateNewAccessToken(token)
          .pipe(
            switchMap(
              token => {
                localStorage.setItem('token', JSON.stringify(token))
                this.tokenService.tokenSubject.next(token);
                return next.handle(this.addAuthorizationHeader(request, token));
              },
            ),
            catchError(error => {
              console.log(error);
              this.tokenService.logout().subscribe();
              return EMPTY;
            })
          );
      } else {
        this.tokenService.logout().subscribe();
        return EMPTY;
      }
    } else {
      return EMPTY;
    }

  }

  addAuthorizationHeader(request: any, token: Token): any {

    let resource = localStorage.getItem("resource")
    const opts = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token.access_token}`,
        'Resource': `${resource}`
      })
    }
    console.log(opts)
    return request.clone(
      opts
    );
  }

}
