import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ColumnHolder} from '../../ColumnHolder';
import {Task} from '../../models/task';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FilterService} from '../../services/filter/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  displayedColumns: string[];
  searchAbleColumns: string[];

  displayAll = false;
  searchAll = false;

  showConfiguration = false;

  @Input() taskDisplayableColumns: Task;
  @Input() taskSearchableColumns: Task;

  // @Output() setDisplayedEvent = new EventEmitter<string[]>();
  // @Output() setSearchableEvent = new EventEmitter<string[]>();
  // @Output() setSearchTermEvent = new EventEmitter<string>();

  ngOnInit(): void {

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

  changeConfigurationVisibility(): void{
    this.showConfiguration = !this.showConfiguration;
  }

  applyFilter(event: Event): void {
   const searchTerm = (event.target as HTMLInputElement).value;
   this.filterService.searchTerm.next(searchTerm);
  }

  // Display

  // checkIfAllDisplayable(): void{
  //   this.displayAll = this.taskDisplayableColumns.subcategories != null &&
  //                     this.taskDisplayableColumns.subcategories
  //                     .every(t => t.completed);
  // }
  //
  // checkIfSomeDisplayable(): boolean {
  //   if (this.taskDisplayableColumns.subcategories == null) {
  //     return false;
  //   }
  //   return this.taskDisplayableColumns.subcategories.filter(t => t.completed).length > 0 && !this.displayAll;
  // }
  //
  // setAllColumnsDisplayable(completed: boolean): void{
  //   this.displayAll = completed;
  //   if (this.taskDisplayableColumns.subcategories == null) {
  //     return;
  //   }
  //   this.taskDisplayableColumns.subcategories.forEach(t => {
  //     t.completed = completed;
  //     this.setFieldDisplay(t.name, completed);
  //   });
  // }
  //
  // setFieldDisplay(fieldName: string, shouldAdd: boolean): void{
  //   this.displayedColumnHolder.setFieldVisibility(fieldName, shouldAdd);
  //   this.displayedColumns = this.displayedColumnHolder.getFields();
  //   this.setDisplayableColumns();
  // }
  //
  // // Search
  //
  // checkIfAllSearchable(): void{
  //   this.searchAll = this.taskSearchableColumns.subcategories != null && this.taskSearchableColumns.subcategories.every(t => t.completed);
  // }
  //
  // checkIfSomeSearchable(): boolean {
  //   if (this.taskSearchableColumns.subcategories == null) {
  //     return false;
  //   }
  //   return this.taskSearchableColumns.subcategories.filter(t => t.completed).length > 0 && !this.searchAll;
  // }
  //
  // setAllColumnsSearchable(completed: boolean): void{
  //   this.searchAll = completed;
  //   if (this.taskSearchableColumns.subcategories == null) {
  //     return;
  //   }
  //   this.taskSearchableColumns.subcategories.forEach(t => {
  //     t.completed = completed;
  //     this.setFieldSearch(t.name, completed);
  //   });
  // }
  //
  // setFieldSearch(fieldName: string, shouldAdd: boolean): void{
  //   this.searchableColumnHolder.setFieldVisibility(fieldName, shouldAdd);
  //   this.searchAbleColumns = this.searchableColumnHolder.getFields();
  //   this.setSearchableColumns();
  // }
}
