import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService, private userService: UserService) { }
  items: any[] = [];
  ngOnInit(): void {
    this.initializeTable();
  }
  private initializeTable(): void{
    this.dashboardService.readFromFile().subscribe(
      {
        next: x => this.setTableData(x)
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
}
