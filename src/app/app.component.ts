import {Component, OnInit} from '@angular/core';
import {TokenService} from './services/token/token.service';
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mock-server-client-frontend';
  isLogged = false;
  subscription;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.tokenService.tokenSubject.subscribe(
      token => {
        if (token) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },error => this.logout());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




  logout(): void {
    this.tokenService
      .logout()
      .subscribe();
  }
}
