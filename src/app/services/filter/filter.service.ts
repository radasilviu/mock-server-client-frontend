import {Injectable} from '@angular/core';
import {PartialObserver, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Filterable} from '../../Filterable';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  displayAbleColumns = new Subject<string[]>();
  searchAbleColumns = new Subject<string[]>();
  searchTerm = new Subject<string>();

  subscriptions$ = new Subscription();

  resetServiceObservers(): void{
    this.subscriptions$.unsubscribe();
    this.subscriptions$ = new Subscription();
  }

  public setFilterSubscriptions(parentComponent: Filterable): void{
    const filterComponent = this;
    const searchTermObserver = getSearchTermObserver();
    const displayColumnsObserver = getDisplayColumnsObserver();
    const searchColumnsObserver = getSearchColumnsObserver();

    setSearchTermSubscription(searchTermObserver);
    setDisplayedColumnsSubscription(displayColumnsObserver);
    setSearchedColumnsSubscription(searchColumnsObserver);

    function getSearchTermObserver(): PartialObserver<any>{
      return {
        next(searchTerm): void {
          parentComponent.setSearchTerm(searchTerm);
        }
      };
    }

    function getDisplayColumnsObserver(): PartialObserver<any>{
      return {
        next(displayedCol): void{
          parentComponent.setDisplayableColumns(displayedCol);
        }
      };
    }

    function getSearchColumnsObserver(): PartialObserver<any>{
      return {
        next(searchedCol): void{
          parentComponent.setSearchableColumns(searchedCol);
        }
      };
    }

    function setSearchTermSubscription(obs: PartialObserver<any>): void{
      filterComponent.subscriptions$.add(filterComponent.searchTerm.pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe(obs));
    }

    function setDisplayedColumnsSubscription(obs: PartialObserver<any>): void{
      filterComponent.subscriptions$.add(filterComponent.displayAbleColumns.subscribe(obs));
    }

    function setSearchedColumnsSubscription(obs: PartialObserver<any>): void{
      filterComponent.subscriptions$.add(filterComponent.searchAbleColumns.subscribe(obs));
    }
  }
}
