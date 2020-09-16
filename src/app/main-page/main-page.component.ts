import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() {
    this.baseUrl = 'http://';
  }

  baseUrl: string;
  clientId: string;
  clientSecret: string;

  ngOnInit(): void {
  }

  goToUrl(): void {
    window.location.href = this.baseUrl + this.clientId + this.clientSecret;
  }

}
