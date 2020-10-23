import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  displayAbleColumns = new Subject<string[]>();
  searchAbleColumns = new Subject<string[]>();
  searchTerm = new Subject<string>();

  resetServiceObservers(): void{
    this.resetSearchTermObservers();
    this.resetDisplayableColumnsObservers();
    this.resetSearchableColumnsObservers();
  }

  private resetSearchTermObservers(): void{
    this.searchTerm.observers.forEach(obs => obs.complete());
  }

  private resetDisplayableColumnsObservers(): void{
    this.displayAbleColumns.observers.forEach(obs => obs.complete());
  }

  private resetSearchableColumnsObservers(): void{
    this.searchAbleColumns.observers.forEach(obs => obs.complete());
  }
}
