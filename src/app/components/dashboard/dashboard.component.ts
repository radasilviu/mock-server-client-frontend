import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  items: string[][];
  headers: string[];

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void{
    this.headers = ['Id', 'Country', 'isReal'];
    this.items = [
      ['1', 'Romania', 'yes'],
      ['2', 'Chad', 'yes'],
      ['3', 'Germany', 'yes']
    ];
  }

  removeEntry(id: string): void{
  console.log(id);
  }

  editEntry(id: string): void{

  }

}
