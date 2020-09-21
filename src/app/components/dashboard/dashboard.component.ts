import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: Array<User>;
  secret: string;
  items: any[] = [];

  constructor(private dashboardService: DashboardService, private userService: UserService) { }

  ngOnInit(): void {
    this.initializeTable();
    this.userService
      .getSecret()
      .subscribe(
        secret => {
          this.secret = secret.content;
        }
      );
  }

  private setTableData(tableData: string): void{
    this.items = JSON.parse(tableData).data;
  }

  deleteEntity(entry: any): void {
    this.userService.deleteUserById(entry.id);
  }

  editEntity(id: string): void{

  }

  private initializeTable(): void {
    this.dashboardService.readFromFile().subscribe(
      {
        next: x => this.setTableData(x)
      }
    );
  }
}
