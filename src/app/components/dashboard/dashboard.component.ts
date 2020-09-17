import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService) { }
  tableContent: string[][];
  tableHeaders: string[];
  ngOnInit(): void {
    this.initializeTable();
  }
  private initializeTable(): void{
    this.tableHeaders = this.service.getTableHeaders();
    this.tableContent = this.service.getTableContent();
  }
  removeEntry(id: string): void{
  console.log(id);
  }
  editEntry(id: string): void{

  }
}
