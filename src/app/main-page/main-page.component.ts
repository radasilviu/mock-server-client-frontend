import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Rx from 'rxjs';
import {Env} from '../configs/env';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    if (this.route.snapshot.queryParams.authToken) {

    }
  }

  login(): void {
    window.location.href = `${Env.authServerLoginFormURL}/oauth/client-login?clientId=${Env.clientId}&clientSecret=${Env.clientSecret}&redirectURL=${window.location.href}`;
  }

}
