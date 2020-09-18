import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {Observable} from 'rxjs';

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
    this.service.readFromFile().subscribe(
      {
        next: x => this.setTableData(x)
      }
    );
  }
  private setTableData(tableData: string): void{
    this.tableHeaders = this.getTableHeaders(tableData);
    this.tableContent = this.getTableContent(tableData);
  }
  private getTableContent(tableData: string): string[][]{
    const JSONObject = JSON.parse(tableData);
    const tableRows: string[][] = [];
    let rowIndex = 0;
    for (const rowData of JSONObject.data) {
      const row: string[] = [];
      for (const item of this.tableHeaders){
        row.push(JSONObject.data[rowIndex][item]);
      }
      tableRows.push(row);
      rowIndex++;
    }
    return tableRows;
  }
  private getTableHeaders(tableData: string): string[]{
    const JSONObject = JSON.parse(tableData);
    const headerArr: string[] = [];
    for (const field of Object.keys(JSONObject.data[0])) {
      headerArr.push(field);
    }
    return headerArr;
  }
  removeEntry(id: string): void {
  }
  editEntry(id: string): void{

  }
}
