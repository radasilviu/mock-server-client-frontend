import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: Array<User>;
  secret: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .getSecret()
      .subscribe(
      secret => {
        this.secret = secret.content;
      }
    );
  }

}
