import {Component, OnInit} from '@angular/core';
import {TokenService} from './services/token/token.service';
import {interval} from "rxjs";
import {UserService} from "./services/user-service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mock-server-client-frontend';
  isLogged = false;
  subscription;

  constructor(private tokenService: TokenService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.getUser());

    this.tokenService.tokenSubject.subscribe(
      token => {
        if (token) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  getUser() {
    this.userService.getUser().subscribe(data => {
    }, error => this.logout())
  }


  logout(): void {
    this.tokenService
      .logout()
      .subscribe();
  }
}
