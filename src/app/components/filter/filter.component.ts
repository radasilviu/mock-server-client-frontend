import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ColumnHolder} from '../../ColumnHolder';
import {Task} from '../../models/task';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  displayedColumnHolder: ColumnHolder;
  searchableColumnHolder: ColumnHolder;

  displayedColumns: string[];
  searchAbleColumns: string[];

  displayAll = false;
  searchAll = false;

  showConfiguration = false;

  @Input() taskDisplayableColumns: Task;
  @Input() taskSearchableColumns: Task;

  @Output() setDisplayedEvent = new EventEmitter<string[]>();
  @Output() setSearchableEvent = new EventEmitter<string[]>();
  @Output() setSearchTermEvent = new EventEmitter<string>();

  modelChanged: Subject<string> = new Subject<string>();

  ngOnInit(): void {

    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(searchTerm => this.setSearchTerm(searchTerm));

    this.displayedColumnHolder = this.getColumnHolderFromTask(this.taskDisplayableColumns, true);
    this.searchableColumnHolder = this.getColumnHolderFromTask(this.taskSearchableColumns, false);

    this.displayedColumns = this.displayedColumnHolder.getFields();
    this.searchAbleColumns = this.searchableColumnHolder.getFields();
  }

  private getColumnHolderFromTask(taskDisplayableColumns: Task, appendActions: boolean): ColumnHolder{
    const colList: string[] = [];
    taskDisplayableColumns.subcategories.forEach(t => {
      colList.push(t.name);
    });
    if (appendActions) {
      colList.push('actions');
    }
    return new ColumnHolder(colList);
  }

  showOptions(): void{
    this.showConfiguration = true;
  }

  hideOptions(): void{
    this.showConfiguration = false;
  }

  applyFilter(event: Event): void {
     const searchTerm = (event.target as HTMLInputElement).value;
     // this.setSearchTerm(searchTerm);
     this.modelChanged.next(searchTerm);
  }

  setDisplayableColumns(): void{
    this.setDisplayedEvent.emit(this.displayedColumns);
  }

  setSearchableColumns(): void{
    this.setSearchableEvent.emit(this.searchAbleColumns);
  }

  setSearchTerm(term: string): void{
    this.setSearchTermEvent.emit(term);
  }

  // Display

  checkIfAllDisplayable(): void{
    this.displayAll = this.taskDisplayableColumns.subcategories != null &&
                      this.taskDisplayableColumns.subcategories
                      .every(t => t.completed);
  }

  checkIfSomeDisplayable(): boolean {
    if (this.taskDisplayableColumns.subcategories == null) {
      return false;
    }
    return this.taskDisplayableColumns.subcategories.filter(t => t.completed).length > 0 && !this.displayAll;
  }

  setAllColumnsDisplayable(completed: boolean): void{
    this.displayAll = completed;
    if (this.taskDisplayableColumns.subcategories == null) {
      return;
    }
    this.taskDisplayableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldDisplay(t.name, completed);
    });
  }

  setFieldDisplay(fieldName: string, shouldAdd: boolean): void{
    this.displayedColumnHolder.setField(fieldName, shouldAdd);
    this.displayedColumns = this.displayedColumnHolder.getFields();
    this.setDisplayableColumns();
  }

  // Search

  checkIfAllSearchable(): void{
    this.searchAll = this.taskSearchableColumns.subcategories != null && this.taskSearchableColumns.subcategories.every(t => t.completed);
  }

  checkIfSomeSearchable(): boolean {
    if (this.taskSearchableColumns.subcategories == null) {
      return false;
    }
    return this.taskSearchableColumns.subcategories.filter(t => t.completed).length > 0 && !this.searchAll;
  }

  setAllColumnsSearchable(completed: boolean): void{
    this.searchAll = completed;
    if (this.taskSearchableColumns.subcategories == null) {
      return;
    }
    this.taskSearchableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldSearch(t.name, completed);
    });
  }

  setFieldSearch(fieldName: string, shouldAdd: boolean): void{
    this.searchableColumnHolder.setField(fieldName, shouldAdd);
    this.searchAbleColumns = this.searchableColumnHolder.getFields();
    this.setSearchableColumns();
  }
}
