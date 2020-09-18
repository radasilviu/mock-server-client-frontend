import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.baseUrl = 'http://localhost:4200/';
    this.clientId = '1';
    this.clientSecret = '2';

    // Test-only
    this.authToken.subscribe((data) => {
      console.log('authToken: ', data);
    });
    this.refreshToken.subscribe((data) => {
      console.log('refreshToken: ', data);
    });
  }

   authToken = new Rx.Subject();
   refreshToken = new Rx.Subject();

  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.authToken) {
      this.authToken.next(this.route.snapshot.queryParams.authToken);
    }
    if (this.route.snapshot.queryParams.refreshToken) {
      this.refreshToken.next(this.route.snapshot.queryParams.refreshToken);
    }
  }

  goToUrl(): void {
    window.location.href = this.baseUrl + '?clientId=' + this.clientId + '&clientSecret=' + this.clientSecret;
  }

  testTokenSave(): void {
    window.location.href = 'http://localhost:4200/?authToken=1&refreshToken=2';
  }

}
