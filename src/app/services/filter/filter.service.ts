import {EventEmitter, Injectable, Output} from '@angular/core';
import {ColumnHolder} from '../../ColumnHolder';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  displayedColumnHolder: ColumnHolder;
  searchableColumnHolder: ColumnHolder;

  displayedColumns = new Observable<string[]>();
  searchAbleColumns = new Observable<string[]>();
  searchTerm = new Subject<string>();

  resetSearchTermObservers(): void{
    this.searchTerm.observers.forEach(obs => obs.complete());
  }

}
