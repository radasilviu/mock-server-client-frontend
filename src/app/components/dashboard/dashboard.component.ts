import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService) { }

  secret: string;

  ngOnInit(): void {
    localStorage.setItem("resource","dashboard")
    this.setSecret();
  }

  private setSecret(): void {
    this.service
      .getSecret()
      .subscribe(
        secret => {
          this.secret = secret.content;
        }
      );
  }
}
