import {Injectable} from '@angular/core';
import {Observer, PartialObserver, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

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

  setSubscriptions(observers: PartialObserver<any>[]): void{
    this.setSearchTermSubscription(observers[0]);
    this.setDisplayedColumnsSubscription(observers[1]);
    this.setSearchedColumnsSubscription(observers[2]);
  }

  private setSearchTermSubscription(obs: PartialObserver<any>): void{
    this.subscriptions$.add(this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe(obs));
  }

  private setDisplayedColumnsSubscription(obs: PartialObserver<any>): void{
    this.subscriptions$.add(this.displayAbleColumns.subscribe(obs));
  }

  private setSearchedColumnsSubscription(obs: PartialObserver<any>): void{
    this.subscriptions$.add(this.searchAbleColumns.subscribe(obs));
  }
}
