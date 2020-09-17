import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }
  getTableContent(): string[][] {
    return [
      ['1', 'Romania', 'yes'],
      ['2', 'Chad', 'yes'],
      ['3', 'Germany', 'yes']
    ];
  }
  getTableHeaders(): string[] {
    return ['Id', 'Country', 'isReal'];
  }
}
