import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService) { }
  items: any[] = [];
  ngOnInit(): void {
    this.initializeTable();
  }
  private initializeTable(): void{
    this.service.readFromFile().subscribe(
      {
        next: x => this.setTableData(x)
      }
    );
  }
  private setTableData(tableData: string): void{
    this.items = JSON.parse(tableData).data;
  }
  removeEntry(entry: any): void {
    console.log(entry);
  }
  editEntry(id: string): void{

  }
}
