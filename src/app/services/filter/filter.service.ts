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

  hasChanged = new Subject();

  resetServiceObservers(): void{
    this.resetSearchTermObservers();
    this.resetDisplayableColumnsObservers();
    this.resetSearchableColumnsObservers();
    this.resetHasChangedObservers();
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

  private resetHasChangedObservers(): void{
    this.hasChanged.observers.forEach(obs => obs.complete());
  }
}
