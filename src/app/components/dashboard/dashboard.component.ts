import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  tableContent: string[][];
  tableHeaders: string[];

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void{
    this.tableHeaders = getTableHeaders();
    this.tableContent = getTableContent();

    function getTableContent(): string[][] {
      return [
        ['1', 'Romania', 'yes'],
        ['2', 'Chad', 'yes'],
        ['3', 'Germany', 'yes']
      ];
    }
    function getTableHeaders(): string[] {
      return ['Id', 'Country', 'isReal'];
    }
  }

  removeEntry(id: string): void{
  console.log(id);
  }

  editEntry(id: string): void{

  }

}
