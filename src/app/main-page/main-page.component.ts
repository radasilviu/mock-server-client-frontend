import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Env} from '../configs/env';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isLoggingIn = false;

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.isLoggingIn = true;
      this.tokenService
        .getAccessToken(code)
        .subscribe(token => {
          this.router.navigate(['dashboard']);
        }
      );
    }
  }

  login(): void {
    window.location.href = `${Env.authServerLoginFormURL}/oauth/client-login?clientId=${Env.clientId}&clientSecret=${Env.clientSecret}&redirectURL=${window.location.href}`;
  }

}
