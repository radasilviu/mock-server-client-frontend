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
    const JSONObject = JSON.parse(tableData);
    this.tableHeaders = this.getTableHeaders(JSONObject);
    this.tableContent = this.getTableContent(JSONObject);
  }
  private getTableContent(JSONObject: any): string[][]{
    const tableRows: string[][] = [];
    for (let rowIndex = 0; rowIndex < JSONObject.data.length; rowIndex++) {
      const processedRow: string[] = [];
      for (const tableHeader of this.tableHeaders){
        processedRow.push(JSONObject.data[rowIndex][tableHeader]);
      }
      tableRows.push(processedRow);
    }
    return tableRows;
  }
  private getTableHeaders(JSONObject: any): string[]{
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
