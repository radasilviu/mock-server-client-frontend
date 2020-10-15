import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService,private tokenService:TokenService) { }

  secret: string;

  ngOnInit(): void {
    this.setSecret();
  }

  private setSecret(): void {
    this.service
      .getSecret()
      .subscribe(
        secret => {
          this.secret = secret.content;
        },

        error =>{
          this.tokenService.logout()
        }
      );
  }
}
