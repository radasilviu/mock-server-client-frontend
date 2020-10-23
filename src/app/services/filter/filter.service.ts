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
    this.searchTerm.observers.forEach(obs => obs.complete());
  }

  // resetSearchTermObservers(): void{
  //   this.searchTerm.observers.forEach(obs => obs.complete());
  // }
}
